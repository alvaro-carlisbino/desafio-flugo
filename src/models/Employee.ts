export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  active: boolean;
  createdAt: string;
}

export type EmployeeFormData = Omit<Employee, 'id' | 'createdAt'>;

export const DEPARTMENTS = [
  'Design',
  'TI',
  'Marketing',
  'Produto',
  'Recursos Humanos',
  'Financeiro',
  'Vendas',
  'Operações',
];
