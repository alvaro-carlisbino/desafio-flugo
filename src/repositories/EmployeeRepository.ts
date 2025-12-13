import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  writeBatch,
  where,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Employee, EmployeeFormData } from '../models/Employee';

const COLLECTION_NAME = 'employees';

class EmployeeRepository {
  private collectionRef = collection(db, COLLECTION_NAME);

  async getAll(): Promise<Employee[]> {
    const q = query(this.collectionRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Employee[];
  }

  async create(data: EmployeeFormData): Promise<Employee> {
    const existingEmployee = await this.findByEmail(data.email);
    if (existingEmployee) {
      throw new Error('Já existe um colaborador cadastrado com este e-mail');
    }

    const newEmployee = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(this.collectionRef, newEmployee);

    const employee: Employee = {
      id: docRef.id,
      ...newEmployee,
    };

    await this.syncWithDepartment(employee.id, employee.department);

    return employee;
  }

  async update(id: string, data: Partial<Employee>): Promise<void> {
    if (data.email) {
      const existingEmployee = await this.findByEmail(data.email);
      if (existingEmployee && existingEmployee.id !== id) {
        throw new Error('Já existe um colaborador cadastrado com este e-mail');
      }
    }

    if (data.department) {
      const currentEmployee = await this.findById(id);
      if (currentEmployee && currentEmployee.department !== data.department) {
        await this.unsyncFromDepartment(id, currentEmployee.department);
        await this.syncWithDepartment(id, data.department);
      }
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
  }

  async delete(id: string): Promise<void> {
    await this.removeFromDepartments(id);
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }

  async deleteMultiple(ids: string[]): Promise<void> {
    for (const id of ids) {
      await this.removeFromDepartments(id);
    }
    
    const batch = writeBatch(db);
    ids.forEach(id => {
      const docRef = doc(db, COLLECTION_NAME, id);
      batch.delete(docRef);
    });
    await batch.commit();
  }

  async findByEmail(email: string): Promise<Employee | null> {
    const q = query(this.collectionRef, where('email', '==', email));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as Employee;
  }

  private async removeFromDepartments(employeeId: string): Promise<void> {
    const departmentsSnapshot = await getDocs(collection(db, 'departments'));
    const batch = writeBatch(db);
    
    departmentsSnapshot.docs.forEach(departmentDoc => {
      const departmentData = departmentDoc.data();
      if (departmentData.employeeIds && departmentData.employeeIds.includes(employeeId)) {
        const departmentRef = doc(db, 'departments', departmentDoc.id);
        batch.update(departmentRef, {
          employeeIds: arrayRemove(employeeId)
        });
      }
    });
    
    await batch.commit();
  }

  private async syncWithDepartment(employeeId: string, departmentName: string): Promise<void> {
    try {
      const departmentsRef = collection(db, 'departments');
      const q = query(departmentsRef, where('name', '==', departmentName));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const departmentDoc = querySnapshot.docs[0];
        const departmentRef = doc(db, 'departments', departmentDoc.id);
        
        await updateDoc(departmentRef, {
          employeeIds: arrayUnion(employeeId)
        });
      }
    } catch (error) {
      console.error('Erro ao sincronizar colaborador com departamento:', error);
    }
  }

  private async unsyncFromDepartment(employeeId: string, departmentName: string): Promise<void> {
    try {
      const departmentsRef = collection(db, 'departments');
      const q = query(departmentsRef, where('name', '==', departmentName));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const departmentDoc = querySnapshot.docs[0];
        const departmentRef = doc(db, 'departments', departmentDoc.id);
        
        await updateDoc(departmentRef, {
          employeeIds: arrayRemove(employeeId)
        });
      }
    } catch (error) {
      console.error('Erro ao remover colaborador do departamento:', error);
    }
  }
}

export const employeeRepository = new EmployeeRepository();
