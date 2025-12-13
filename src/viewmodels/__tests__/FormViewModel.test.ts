import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFormViewModel } from '../FormViewModel';

describe('FormViewModel', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => useFormViewModel(mockOnSubmit));

    expect(result.current.formData.name).toBe('');
    expect(result.current.formData.email).toBe('');
    expect(result.current.formData.active).toBe(true);
    expect(result.current.currentStep).toBe(0);
  });

  it('deve validar email obrigatório', () => {
    const { result } = renderHook(() => useFormViewModel(mockOnSubmit));

    act(() => {
      result.current.updateField('email', '');
      result.current.handleBlur('email');
    });

    expect(result.current.errors.email).toBe('E-mail é obrigatório');
  });

  it('deve validar formato de email', () => {
    const { result } = renderHook(() => useFormViewModel(mockOnSubmit));

    act(() => {
      result.current.updateField('email', 'email-invalido');
      result.current.handleBlur('email');
    });

    expect(result.current.errors.email).toBe('E-mail inválido');
  });

  it('deve aceitar email válido', () => {
    const { result } = renderHook(() => useFormViewModel(mockOnSubmit));

    act(() => {
      result.current.updateField('email', 'teste@flugo.com');
      result.current.handleBlur('email');
    });

    expect(result.current.errors.email).toBeUndefined();
  });

  it('deve calcular progresso corretamente', () => {
    const { result } = renderHook(() => useFormViewModel(mockOnSubmit));

    expect(result.current.getProgress()).toBe(50);

    act(() => {
      result.current.updateField('name', 'João Silva');
      result.current.updateField('email', 'joao@flugo.com');
      result.current.nextStep();
    });

    expect(result.current.getProgress()).toBe(100);
  });
});