import { useState, useEffect } from 'react';
import { Department, DepartmentFormData } from '../models/Department';
import { departmentRepository } from '../repositories/DepartmentRepository';

export const useDepartmentViewModel = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      const data = await departmentRepository.getAll();
      setDepartments(data);
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar departamentos:', err);
      setError('Erro ao carregar departamentos');
    } finally {
      setLoading(false);
    }
  };

  const addDepartment = async (data: DepartmentFormData) => {
    try {
      const newDepartment = await departmentRepository.create(data);
      setDepartments(prev => [newDepartment, ...prev]);
      return newDepartment;
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao adicionar departamento';
      setError(errorMessage);
      console.error('Erro ao adicionar departamento:', err);
      throw new Error(errorMessage);
    }
  };

  const updateDepartment = async (id: string, data: Partial<Department>) => {
    try {
      await departmentRepository.update(id, data);
      setDepartments(prev =>
        prev.map(dept => (dept.id === id ? { ...dept, ...data } : dept))
      );
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao atualizar departamento';
      setError(errorMessage);
      console.error('Erro ao atualizar departamento:', err);
      throw new Error(errorMessage);
    }
  };

  const deleteDepartment = async (id: string) => {
    try {
      await departmentRepository.delete(id);
      setDepartments(prev => prev.filter(dept => dept.id !== id));
    } catch (err) {
      console.error('Erro ao deletar departamento:', err);
      throw err;
    }
  };

  const deleteMultipleDepartments = async (ids: string[]) => {
    try {
      await departmentRepository.deleteMultiple(ids);
      setDepartments(prev => prev.filter(dept => !ids.includes(dept.id)));
    } catch (err) {
      console.error('Erro ao deletar departamentos:', err);
      throw err;
    }
  };

  return {
    departments,
    loading,
    error,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    deleteMultipleDepartments,
    reload: loadDepartments,
  };
};
