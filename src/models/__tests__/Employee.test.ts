import { describe, it, expect } from 'vitest';
import { Employee, HIERARCHY_LEVELS } from '../Employee';

describe('Employee Model', () => {
  it('deve ter interface Employee bem definida', () => {
    const employee: Employee = {
      id: '1',
      name: 'João Silva',
      email: 'joao@flugo.com',
      department: 'TI',
      active: true,
      createdAt: new Date().toISOString(),
    };
    
    expect(employee.id).toBe('1');
    expect(employee.name).toBe('João Silva');
    expect(employee.active).toBe(true);
  });

  it('deve ter 4 níveis hierárquicos disponíveis', () => {
    expect(HIERARCHY_LEVELS).toHaveLength(4);
  });

  it('deve conter níveis hierárquicos corretos', () => {
    const levels = HIERARCHY_LEVELS.map(h => h.value);
    expect(levels).toContain('junior');
    expect(levels).toContain('pleno');
    expect(levels).toContain('senior');
    expect(levels).toContain('gestor');
  });
});
