import { useState } from 'react';
import { toast } from 'sonner';
import { MainLayout } from '../layouts/MainLayout';
import { EmployeeList } from './EmployeeList';
import { EmployeeForm } from './EmployeeForm';
import { useEmployeeViewModel } from '../../viewmodels/EmployeeViewModel';
import { Employee } from '../../models/Employee';

type View = 'list' | 'form';

export const EmployeePage = () => {
  const [currentView, setCurrentView] = useState<View>('list');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const { employees, addEmployee, updateEmployee, deleteEmployee, deleteMultipleEmployees } =
    useEmployeeViewModel();

  const handleAddEmployee = async (data: any) => {
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, data);
        toast.success('Colaborador atualizado com sucesso!');
        setEditingEmployee(null);
      } else {
        await addEmployee(data);
        toast.success('Colaborador cadastrado com sucesso!');
      }
      setCurrentView('list');
    } catch (error: any) {
      console.error('Erro ao salvar colaborador:', error);
      toast.error(error.message || 'Erro ao salvar colaborador');
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setCurrentView('form');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este colaborador?')) {
      try {
        await deleteEmployee(id);
        toast.success('Colaborador excluído com sucesso!');
      } catch (error: any) {
        console.error('Erro ao deletar colaborador:', error);
        toast.error(error.message || 'Erro ao excluir colaborador');
      }
    }
  };

  const handleDeleteMultiple = async (ids: string[]) => {
    try {
      await deleteMultipleEmployees(ids);
      toast.success(`${ids.length} colaborador(es) excluído(s) com sucesso!`);
    } catch (error: any) {
      console.error('Erro ao deletar colaboradores:', error);
      toast.error(error.message || 'Erro ao excluir colaboradores');
    }
  };

  const handleCancel = () => {
    setEditingEmployee(null);
    setCurrentView('list');
  };

  const handleAddNew = () => {
    setEditingEmployee(null);
    setCurrentView('form');
  };

  return (
    <MainLayout>
      {currentView === 'list' ? (
        <EmployeeList
          employees={employees}
          onAddNew={handleAddNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDeleteMultiple={handleDeleteMultiple}
        />
      ) : (
        <EmployeeForm
          initialData={editingEmployee}
          employees={employees}
          onSubmit={handleAddEmployee}
          onCancel={handleCancel}
        />
      )}
    </MainLayout>
  );
};
