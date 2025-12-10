import { useState, useEffect } from 'react';
import { Employee, EmployeeFormData } from '../models/Employee';
import { employeeRepository } from '../repositories/EmployeeRepository';

export const useEmployeeViewModel = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await employeeRepository.getAll();
      setEmployees(data);
    } catch (err) {
      setError('Erro ao carregar colaboradores');
      console.error('Erro ao carregar colaboradores:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addEmployee = async (data: EmployeeFormData): Promise<void> => {
    try {
      setError(null);
      const newEmployee = await employeeRepository.create(data);
      setEmployees(prev => [newEmployee, ...prev]);
    } catch (err) {
      setError('Erro ao adicionar colaborador');
      console.error('Erro ao adicionar colaborador:', err);
      throw err;
    }
  };

  const deleteEmployee = async (id: string): Promise<void> => {
    try {
      setError(null);
      await employeeRepository.delete(id);
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    } catch (err) {
      setError('Erro ao deletar colaborador');
      console.error('Erro ao deletar colaborador:', err);
      throw err;
    }
  };

  const updateEmployee = async (id: string, data: Partial<Employee>): Promise<void> => {
    try {
      setError(null);
      await employeeRepository.update(id, data);
      setEmployees(prev => prev.map(emp =>
        emp.id === id ? { ...emp, ...data } : emp
      ));
    } catch (err) {
      setError('Erro ao atualizar colaborador');
      console.error('Erro ao atualizar colaborador:', err);
      throw err;
    }
  };

  return {
    employees,
    isLoading,
    error,
    addEmployee,
    deleteEmployee,
    updateEmployee,
    refreshEmployees: loadEmployees,
  };
};
