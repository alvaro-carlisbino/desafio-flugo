import { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import { MainLayout } from './views/layouts/MainLayout';
import { EmployeeList } from './views/pages/EmployeeList';
import { EmployeeForm } from './views/pages/EmployeeForm';
import { useEmployeeViewModel } from './viewmodels/EmployeeViewModel';
import { Employee } from './models/Employee';

type View = 'list' | 'form';

function App() {
  const [currentView, setCurrentView] = useState<View>('list');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployeeViewModel();

  const handleAddEmployee = async (data: any) => {
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, data);
        setEditingEmployee(null);
      } else {
        await addEmployee(data);
      }
      setCurrentView('list');
    } catch (error) {
      console.error('Erro ao salvar colaborador:', error);
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
      } catch (error) {
        console.error('Erro ao deletar colaborador:', error);
      }
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout onNavigate={() => setCurrentView('list')}>
        {currentView === 'list' ? (
          <EmployeeList
            employees={employees}
            onAddNew={handleAddNew}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <EmployeeForm
            initialData={editingEmployee}
            onSubmit={handleAddEmployee}
            onCancel={handleCancel}
          />
        )}
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
