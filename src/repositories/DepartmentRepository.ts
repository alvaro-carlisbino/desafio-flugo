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
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Department, DepartmentFormData } from '../models/Department';

const COLLECTION_NAME = 'departments';

class DepartmentRepository {
  private collectionRef = collection(db, COLLECTION_NAME);

  async getAll(): Promise<Department[]> {
    const q = query(this.collectionRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Department[];
  }

  async create(data: DepartmentFormData): Promise<Department> {
    const existingDepartment = await this.findByName(data.name);
    if (existingDepartment) {
      throw new Error('Já existe um departamento cadastrado com este nome');
    }

    const newDepartment = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(this.collectionRef, newDepartment);

    return {
      id: docRef.id,
      ...newDepartment,
    };
  }

  async update(id: string, data: Partial<Department>): Promise<void> {
    if (data.name) {
      const existingDepartment = await this.findByName(data.name);
      if (existingDepartment && existingDepartment.id !== id) {
        throw new Error('Já existe um departamento cadastrado com este nome');
      }
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }

  async deleteMultiple(ids: string[]): Promise<void> {
    const batch = writeBatch(db);
    ids.forEach(id => {
      const docRef = doc(db, COLLECTION_NAME, id);
      batch.delete(docRef);
    });
    await batch.commit();
  }

  async findByName(name: string): Promise<Department | null> {
    const q = query(this.collectionRef, where('name', '==', name));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as Department;
  }
}

export const departmentRepository = new DepartmentRepository();
