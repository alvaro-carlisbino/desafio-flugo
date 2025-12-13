import { useState, useEffect } from 'react';
import { EmployeeFormData, Employee } from '../models/Employee';

interface FormErrors {
  name?: string;
  email?: string;
  department?: string;
  position?: string;
  admissionDate?: string;
  baseSalary?: string;
}

export const useFormViewModel = (
  onSubmit: (data: EmployeeFormData) => Promise<void> | void,
  initialData?: Employee | null
) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    email: '',
    department: '',
    active: true,
    position: '',
    admissionDate: '',
    hierarchyLevel: undefined,
    managerId: '',
    baseSalary: undefined,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        department: initialData.department,
        active: initialData.active,
        position: initialData.position || '',
        admissionDate: initialData.admissionDate || '',
        hierarchyLevel: initialData.hierarchyLevel,
        managerId: initialData.managerId || '',
        baseSalary: initialData.baseSalary,
      });
    }
  }, [initialData]);

  const totalSteps = 2;

  const validateField = (field: keyof EmployeeFormData, value: any): string | undefined => {
    switch (field) {
      case 'name':
        if (!value || !value.trim()) {
          return 'Nome é obrigatório';
        }
        if (value.trim().length < 2) {
          return 'Nome deve ter no mínimo 2 caracteres';
        }
        if (value.trim().length > 100) {
          return 'Nome deve ter no máximo 100 caracteres';
        }
        break;
      case 'email':
        if (!value || !value.trim()) {
          return 'E-mail é obrigatório';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return 'E-mail inválido';
        }
        if (value.trim().length > 255) {
          return 'E-mail deve ter no máximo 255 caracteres';
        }
        break;
      case 'department':
        if (!value) {
          return 'Departamento é obrigatório';
        }
        break;
      case 'baseSalary':
        if (value !== undefined && value !== null && value !== '') {
          if (isNaN(Number(value)) || Number(value) < 0) {
            return 'Salário deve ser um número positivo';
          }
          if (Number(value) > 1000000) {
            return 'Salário não pode exceder R$ 1.000.000';
          }
        }
        break;
    }
    return undefined;
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 0) {
      const nameError = validateField('name', formData.name);
      const emailError = validateField('email', formData.email);
      if (nameError) newErrors.name = nameError;
      if (emailError) newErrors.email = emailError;
    } else if (step === 1) {
      const deptError = validateField('department', formData.department);
      if (deptError) newErrors.department = deptError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = <K extends keyof EmployeeFormData>(
    field: K,
    value: EmployeeFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field as keyof EmployeeFormData, formData[field as keyof EmployeeFormData]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const nextStep = async () => {
    if (validateStep(currentStep)) {
      if (currentStep === totalSteps - 1) {
        await onSubmit(formData);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      department: '',
      active: true,
      position: '',
      admissionDate: '',
      hierarchyLevel: undefined,
      managerId: '',
      baseSalary: undefined,
    });
    setCurrentStep(0);
    setErrors({});
    setTouched({});
  };

  const getProgress = () => {
    return ((currentStep + 1) / totalSteps) * 100;
  };

  return {
    formData,
    errors,
    touched,
    currentStep,
    totalSteps,
    updateField,
    handleBlur,
    nextStep,
    previousStep,
    resetForm,
    getProgress,
  };
};
