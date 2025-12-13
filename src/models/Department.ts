export interface Department {
  id: string;
  name: string;
  managerId: string;
  employeeIds: string[];
  createdAt: string;
}

export type DepartmentFormData = Omit<Department, 'id' | 'createdAt'>;
