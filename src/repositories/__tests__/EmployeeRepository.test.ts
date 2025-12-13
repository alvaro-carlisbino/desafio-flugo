import { describe, it, expect, vi, beforeEach } from 'vitest';
import { employeeRepository } from '../EmployeeRepository';
import * as firestore from 'firebase/firestore';

vi.mock('firebase/firestore');

describe('EmployeeRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('deve buscar todos os colaboradores ordenados por data', async () => {
      const mockDocs = [
        {
          id: '1',
          data: () => ({
            name: 'João Silva',
            email: 'joao@flugo.com',
            department: 'TI',
            active: true,
            createdAt: '2024-01-01',
          }),
        },
      ];

      vi.mocked(firestore.getDocs).mockResolvedValue({
        docs: mockDocs,
      } as any);

      const result = await employeeRepository.getAll();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('João Silva');
      expect(firestore.query).toHaveBeenCalled();
      expect(firestore.orderBy).toHaveBeenCalledWith('createdAt', 'desc');
    });
  });

  describe('create', () => {
    it('deve criar um novo colaborador', async () => {
      const mockData = {
        name: 'Maria Santos',
        email: 'maria@flugo.com',
        department: 'Design',
        active: true,
      };

      vi.mocked(firestore.addDoc).mockResolvedValue({
        id: 'new-id',
      } as any);

      const result = await employeeRepository.create(mockData);

      expect(result.id).toBe('new-id');
      expect(result.name).toBe('Maria Santos');
      expect(result.createdAt).toBeDefined();
      expect(firestore.addDoc).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('deve atualizar um colaborador existente', async () => {
      const updateData = { name: 'João Silva Atualizado' };

      vi.mocked(firestore.updateDoc).mockResolvedValue(undefined);

      await employeeRepository.update('123', updateData);

      expect(firestore.doc).toHaveBeenCalled();
      expect(firestore.updateDoc).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('deve deletar um colaborador', async () => {
      vi.mocked(firestore.deleteDoc).mockResolvedValue(undefined);

      await employeeRepository.delete('123');

      expect(firestore.doc).toHaveBeenCalled();
      expect(firestore.deleteDoc).toHaveBeenCalled();
    });
  });
});
