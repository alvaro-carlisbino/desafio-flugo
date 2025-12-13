export type HierarchyLevel = 'junior' | 'pleno' | 'senior' | 'gestor';

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  active: boolean;
  createdAt: string;
  position?: string;
  admissionDate?: string;
  hierarchyLevel?: HierarchyLevel;
  managerId?: string;
  baseSalary?: number;
}

export type EmployeeFormData = Omit<Employee, 'id' | 'createdAt'>;

// Departamentos agora são gerenciados pela lista de departamentos criados

export const HIERARCHY_LEVELS: { value: HierarchyLevel; label: string }[] = [
  { value: 'junior', label: 'Júnior' },
  { value: 'pleno', label: 'Pleno' },
  { value: 'senior', label: 'Sênior' },
  { value: 'gestor', label: 'Gestor' },
];
