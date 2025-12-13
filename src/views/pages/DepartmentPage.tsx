import { useState } from 'react';
import { toast } from 'sonner';
import { MainLayout } from '../layouts/MainLayout';
import { DepartmentList } from './DepartmentList';
import { DepartmentForm } from './DepartmentForm';
import { useDepartmentViewModel } from '../../viewmodels/DepartmentViewModel';
import { useEmployeeViewModel } from '../../viewmodels/EmployeeViewModel';
import { Department } from '../../models/Department';


type View = 'list' | 'form';

export const DepartmentPage = () => {
  const [currentView, setCurrentView] = useState<View>('list');
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const { departments, addDepartment, updateDepartment, deleteDepartment } =
    useDepartmentViewModel();
  const { employees } = useEmployeeViewModel();

  const handleAddDepartment = async (data: any) => {
    try {
      if (editingDepartment) {
        await updateDepartment(editingDepartment.id, data);
        toast.success('Departamento atualizado com sucesso!');
        setEditingDepartment(null);
      } else {
        await addDepartment(data);
        toast.success('Departamento criado com sucesso!');
      }
      setCurrentView('list');
    } catch (error: any) {
      console.error('Erro ao salvar departamento:', error);
      toast.error(error.message || 'Erro ao salvar departamento');
    }
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setCurrentView('form');
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDepartment(id);
      toast.success('Departamento excluído com sucesso!');
    } catch (error: any) {
      console.error('Erro ao deletar departamento:', error);
      toast.error(error.message || 'Erro ao excluir departamento');
    }
  };

  const handleCancel = () => {
    setEditingDepartment(null);
    setCurrentView('list');
  };

  const handleAddNew = () => {
    setEditingDepartment(null);
    setCurrentView('form');
  };



  return (
    <MainLayout>
      {currentView === 'list' ? (
        <DepartmentList
          departments={departments}
          employees={employees}
          onAddNew={handleAddNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <DepartmentForm
          initialData={editingDepartment}
          employees={employees}
          departments={departments}
          onSubmit={handleAddDepartment}
          onCancel={handleCancel}
        />
      )}
    </MainLayout>
  );
};
