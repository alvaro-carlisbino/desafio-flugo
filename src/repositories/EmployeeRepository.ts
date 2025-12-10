import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
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
    const newEmployee = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(this.collectionRef, newEmployee);

    return {
      id: docRef.id,
      ...newEmployee,
    };
  }

  async update(id: string, data: Partial<Employee>): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }
}

export const employeeRepository = new EmployeeRepository();
