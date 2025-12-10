import { Employee } from './Employee';

export const initialEmployees: Employee[] = [
  {
    id: '1',
    name: 'Fernanda Torres',
    email: 'fernanda.torres@flugo.com',
    department: 'Design',
    active: true,
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Joana D\'Arc',
    email: 'joana.darc@flugo.com',
    department: 'TI',
    active: true,
    createdAt: '2024-01-20T14:20:00Z',
  },
  {
    id: '3',
    name: 'Mari Froes',
    email: 'mari.froes@flugo.com',
    department: 'Marketing',
    active: true,
    createdAt: '2024-02-01T09:15:00Z',
  },
  {
    id: '4',
    name: 'Clara Costa',
    email: 'clara.costa@flugo.com',
    department: 'Produto',
    active: false,
    createdAt: '2024-02-10T16:45:00Z',
  },
];
