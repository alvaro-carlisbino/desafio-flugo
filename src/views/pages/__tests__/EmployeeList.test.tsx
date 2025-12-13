import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../../theme/theme';
import { EmployeeList } from '../EmployeeList';
import { Employee } from '../../../models/Employee';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('EmployeeList', () => {
  const mockEmployees: Employee[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@flugo.com',
      department: 'TI',
      active: true,
      createdAt: '2024-01-01',
    },
  ];

  const mockHandlers = {
    onAddNew: vi.fn(),
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };

  it('deve renderizar o título corretamente', () => {
    renderWithTheme(<EmployeeList employees={[]} {...mockHandlers} />);
    expect(screen.getByText('Colaboradores')).toBeInTheDocument();
  });

  it('deve renderizar botão de novo colaborador', () => {
    renderWithTheme(<EmployeeList employees={[]} {...mockHandlers} />);
    const button = screen.getByRole('button', { name: /novo colaborador/i });
    expect(button).toBeInTheDocument();
  });

  it('deve mostrar mensagem quando não há colaboradores', () => {
    renderWithTheme(<EmployeeList employees={[]} {...mockHandlers} />);
    expect(screen.getByText(/nenhum colaborador cadastrado/i)).toBeInTheDocument();
  });
});