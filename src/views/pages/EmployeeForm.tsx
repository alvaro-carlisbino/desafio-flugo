import {
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useFormViewModel } from '../../viewmodels/FormViewModel';
import { EmployeeFormData, Employee, HIERARCHY_LEVELS } from '../../models/Employee';
import { useEmployeeViewModel } from '../../viewmodels/EmployeeViewModel';
import { useDepartmentViewModel } from '../../viewmodels/DepartmentViewModel';

interface EmployeeFormProps {
  initialData?: Employee | null;
  employees: Employee[];
  onSubmit: (data: EmployeeFormData) => void;
  onCancel: () => void;
}

export const EmployeeForm = ({ initialData, employees, onSubmit, onCancel }: EmployeeFormProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { departments } = useDepartmentViewModel();

  const {
    formData,
    errors,
    touched,
    currentStep,
    updateField,
    handleBlur,
    nextStep,
    previousStep,
    getProgress,
  } = useFormViewModel(onSubmit, initialData);

  const managers = employees.filter(emp => emp.hierarchyLevel === 'gestor' && emp.active);
  const activeDepartments = departments.filter(dept => {
    const deptEmployees = employees.filter(emp => dept.employeeIds.includes(emp.id));
    return deptEmployees.length > 0 || dept.employeeIds.length === 0;
  });

  const steps = ['Informações Básicas', 'Informações Profissionais'];

  const handleBack = () => {
    if (currentStep === 0) {
      onCancel();
    } else {
      previousStep();
    }
  };

  return (
    <Box maxWidth="900px">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onCancel}
        sx={{ mb: 3, color: 'text.secondary' }}
        size={isMobile ? 'small' : 'medium'}
      >
        Voltar para Colaboradores
      </Button>

      <Box sx={{ mb: 4 }}>
        <LinearProgress
          variant="determinate"
          value={getProgress()}
          sx={{ height: 6, borderRadius: 1, mb: 1 }}
        />
        <Typography variant="body2" color="text.secondary" textAlign="right">
          {Math.round(getProgress())}%
        </Typography>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 3, md: 5 }}>
        {!isMobile && (
          <Box sx={{ width: 200 }}>
            <Stepper activeStep={currentStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>
                    <Typography
                      variant="body2"
                      fontWeight={index === currentStep ? 600 : 400}
                      color={index <= currentStep ? 'text.primary' : 'text.secondary'}
                    >
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}

        <Paper sx={{ flex: 1, p: { xs: 3, md: 4 } }} elevation={0}>
          {isMobile && (
            <Stepper activeStep={currentStep} sx={{ mb: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel />
                </Step>
              ))}
            </Stepper>
          )}

          <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight="bold" mb={3}>
            {initialData ? 'Editar Colaborador' : steps[currentStep]}
          </Typography>

          {currentStep === 0 && (
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Nome completo"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                placeholder="Ex: João da Silva"
                size={isMobile ? 'small' : 'medium'}
              />

              <TextField
                fullWidth
                label="E-mail corporativo"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                placeholder="exemplo@flugo.com"
                size={isMobile ? 'small' : 'medium'}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={formData.active}
                    onChange={(e) => updateField('active', e.target.checked)}
                    color="primary"
                  />
                }
                label={formData.active ? "Colaborador ativo" : "Colaborador inativo"}
              />
            </Stack>
          )}

          {currentStep === 1 && (
            <Stack spacing={3}>
              <FormControl
                fullWidth
                error={touched.department && Boolean(errors.department)}
                size={isMobile ? 'small' : 'medium'}
              >
                <InputLabel>Departamento</InputLabel>
                <Select
                  value={formData.department}
                  label="Departamento"
                  onChange={(e) => updateField('department', e.target.value)}
                  onBlur={() => handleBlur('department')}
                >
                  <MenuItem value="">
                    <em>Selecione um departamento</em>
                  </MenuItem>
                  {activeDepartments.map((dept) => (
                    <MenuItem key={dept.id} value={dept.name}>
                      {dept.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.department && errors.department && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                    {errors.department}
                  </Typography>
                )}
              </FormControl>

              <TextField
                fullWidth
                label="Cargo"
                value={formData.position || ''}
                onChange={(e) => updateField('position', e.target.value)}
                placeholder="Ex: Desenvolvedor Frontend"
                size={isMobile ? 'small' : 'medium'}
              />

              <TextField
                fullWidth
                label="Data de Admissão"
                type="date"
                value={formData.admissionDate || ''}
                onChange={(e) => updateField('admissionDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                size={isMobile ? 'small' : 'medium'}
              />

              <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                <InputLabel>Nível Hierárquico</InputLabel>
                <Select
                  value={formData.hierarchyLevel || ''}
                  label="Nível Hierárquico"
                  onChange={(e) => updateField('hierarchyLevel', e.target.value as any)}
                >
                  <MenuItem value="">
                    <em>Selecione um nível</em>
                  </MenuItem>
                  {HIERARCHY_LEVELS.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      {level.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                <InputLabel>Gestor Responsável</InputLabel>
                <Select
                  value={formData.managerId || ''}
                  label="Gestor Responsável"
                  onChange={(e) => updateField('managerId', e.target.value)}
                  disabled={managers.length === 0}
                >
                  <MenuItem value="">
                    <em>Nenhum gestor</em>
                  </MenuItem>
                  {managers.map((manager) => (
                    <MenuItem key={manager.id} value={manager.id}>
                      {manager.name}
                    </MenuItem>
                  ))}
                </Select>
                {managers.length === 0 && (
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1.5 }}>
                    Nenhum colaborador com nível de gestor cadastrado
                  </Typography>
                )}
              </FormControl>

              <TextField
                fullWidth
                label="Salário Base"
                type="number"
                value={formData.baseSalary || ''}
                onChange={(e) => updateField('baseSalary', e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Ex: 5000.00"
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>R$</Typography>,
                }}
                size={isMobile ? 'small' : 'medium'}
              />
            </Stack>
          )}

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}
          >
            <Button
              onClick={handleBack}
              color="inherit"
              size={isMobile ? 'small' : 'medium'}
            >
              {currentStep === 0 ? 'Cancelar' : 'Voltar'}
            </Button>
            <Button
              variant="contained"
              onClick={nextStep}
              size={isMobile ? 'small' : 'medium'}
            >
              {currentStep === steps.length - 1 ? 'Concluir cadastro' : 'Próximo passo'}
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};
