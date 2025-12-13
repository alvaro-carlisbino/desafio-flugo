import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Alert,
  useMediaQuery,
  useTheme,
  Chip,
  FormControlLabel,
  Checkbox,
  Divider,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { Department, DepartmentFormData } from '../../models/Department';
import { Employee } from '../../models/Employee';

interface DepartmentFormProps {
  initialData?: Department | null;
  employees: Employee[];
  departments: Department[];
  onSubmit: (data: DepartmentFormData) => void;
  onCancel: () => void;
}

export const DepartmentForm = ({
  initialData,
  employees,
  departments,
  onSubmit,
  onCancel,
}: DepartmentFormProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [name, setName] = useState('');
  const [managerId, setManagerId] = useState('');
  const [employeeIds, setEmployeeIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ name?: string; managerId?: string }>({});

  const managers = employees.filter(emp => emp.hierarchyLevel === 'gestor' && emp.active);
  
  const getEmployeesInOtherDepartments = () => {
    const employeesInOtherDepts = new Set<string>();
    
    departments.forEach(dept => {
      if (dept.id !== initialData?.id) {
        dept.employeeIds.forEach(empId => employeesInOtherDepts.add(empId));
      }
    });
    
    return employeesInOtherDepts;
  };
  
  const employeesInOtherDepartments = getEmployeesInOtherDepartments();
  const availableEmployees = employees.filter(
    emp => emp.active && !employeesInOtherDepartments.has(emp.id || '')
  );

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setManagerId(initialData.managerId);
      setEmployeeIds(initialData.employeeIds);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: { name?: string; managerId?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Nome do departamento é obrigatório';
    }

    if (!managerId) {
      newErrors.managerId = 'Gestor responsável é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit({
        name,
        managerId,
        employeeIds,
      });
    }
  };

  const getEmployeeName = (id: string) => {
    const employee = employees.find(emp => emp.id === id);
    return employee ? employee.name : 'Desconhecido';
  };

  return (
    <Box maxWidth="900px">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onCancel}
        sx={{ mb: 3, color: 'text.secondary' }}
        size={isMobile ? 'small' : 'medium'}
      >
        Voltar para Departamentos
      </Button>

      <Paper sx={{ p: { xs: 3, md: 4 } }} elevation={0}>
        <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight="bold" mb={3}>
          {initialData ? 'Editar Departamento' : 'Novo Departamento'}
        </Typography>

        {managers.length === 0 && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            Nenhum colaborador com nível de gestor cadastrado. É necessário ter pelo menos um
            gestor para criar um departamento.
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Nome do Departamento"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={Boolean(errors.name)}
              helperText={errors.name}
              placeholder="Ex: Tecnologia da Informação"
              size={isMobile ? 'small' : 'medium'}
            />

            <FormControl
              fullWidth
              error={Boolean(errors.managerId)}
              size={isMobile ? 'small' : 'medium'}
              disabled={managers.length === 0}
            >
              <InputLabel>Gestor Responsável</InputLabel>
              <Select
                value={managerId}
                label="Gestor Responsável"
                onChange={(e) => setManagerId(e.target.value)}
              >
                <MenuItem value="">
                  <em>Selecione um gestor</em>
                </MenuItem>
                {managers.map((manager) => (
                  <MenuItem key={manager.id} value={manager.id}>
                    {manager.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.managerId && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.managerId}
                </Typography>
              )}
            </FormControl>

            <Box>
              <Typography variant="subtitle2" fontWeight={600} mb={2}>
                Colaboradores do Departamento
              </Typography>

              <Card variant="outlined" sx={{ mb: 2, maxHeight: 400, overflow: 'auto' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Selecione os colaboradores para este departamento:
                  </Typography>
                  <Stack spacing={1}>
                    {employees.filter(emp => emp.active).map((employee) => {
                      const isInOtherDept = employeesInOtherDepartments.has(employee.id || '');
                      const isCurrentlySelected = employeeIds.includes(employee.id || '');
                      const otherDeptName = isInOtherDept ? 
                        departments.find(dept => 
                          dept.id !== initialData?.id && 
                          dept.employeeIds.includes(employee.id || '')
                        )?.name : null;

                      return (
                        <FormControlLabel
                          key={employee.id}
                          control={
                            <Checkbox
                              checked={isCurrentlySelected}
                              disabled={isInOtherDept}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setEmployeeIds([...employeeIds, employee.id || '']);
                                } else {
                                  setEmployeeIds(employeeIds.filter(id => id !== employee.id));
                                }
                              }}
                            />
                          }
                          label={
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ flex: 1 }}>
                              <Avatar sx={{ 
                                width: 24, 
                                height: 24, 
                                bgcolor: isInOtherDept ? 'grey.400' : 'primary.light' 
                              }}>
                                <PersonIcon sx={{ fontSize: 14 }} />
                              </Avatar>
                              <Box sx={{ flex: 1 }}>
                                <Typography 
                                  variant="body2" 
                                  fontWeight={500}
                                  color={isInOtherDept ? 'text.disabled' : 'text.primary'}
                                >
                                  {employee.name}
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                  <Typography 
                                    variant="caption" 
                                    color={isInOtherDept ? 'text.disabled' : 'text.secondary'}
                                  >
                                    {employee.position} • {employee.hierarchyLevel?.charAt(0).toUpperCase() + employee.hierarchyLevel?.slice(1)}
                                  </Typography>
                                  {isInOtherDept && (
                                    <Chip
                                      label={`Em: ${otherDeptName}`}
                                      size="small"
                                      color="default"
                                      variant="outlined"
                                      sx={{ fontSize: '0.7rem', height: 18 }}
                                    />
                                  )}
                                </Stack>
                              </Box>
                            </Stack>
                          }
                        />
                      );
                    })}
                  </Stack>
                </CardContent>
              </Card>

              {employeeIds.length > 0 && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>{employeeIds.length} colaborador(es)</strong> selecionado(s) para este departamento.
                  </Typography>
                </Alert>
              )}
            </Box>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}
          >
            <Button
              onClick={onCancel}
              color="inherit"
              size={isMobile ? 'small' : 'medium'}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              size={isMobile ? 'small' : 'medium'}
              disabled={managers.length === 0}
            >
              {initialData ? 'Salvar Alterações' : 'Criar Departamento'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};
