import { useState, useEffect } from 'react';
import { EmployeeFormData, Employee } from '../models/Employee';

interface FormErrors {
  name?: string;
  email?: string;
  department?: string;
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
        if (value.trim().length < 3) {
          return 'Nome deve ter no mínimo 3 caracteres';
        }
        break;
      case 'email':
        if (!value || !value.trim()) {
          return 'E-mail é obrigatório';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'E-mail inválido';
        }
        break;
      case 'department':
        if (!value) {
          return 'Departamento é obrigatório';
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
    validateField(field as keyof EmployeeFormData, formData[field as keyof EmployeeFormData]);
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
