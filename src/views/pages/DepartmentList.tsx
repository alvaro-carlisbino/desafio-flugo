import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Stack,
  Chip,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Group as GroupIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import { Department } from '../../models/Department';
import { Employee } from '../../models/Employee';

interface DepartmentListProps {
  departments: Department[];
  employees: Employee[];
  onAddNew: () => void;
  onEdit: (department: Department) => void;
  onDelete: (id: string) => void;
}

export const DepartmentList = ({
  departments,
  employees,
  onAddNew,
  onEdit,
  onDelete,
}: DepartmentListProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getEmployeeCount = (employeeIds: string[]) => {
    return employeeIds.length;
  };

  const getManagerName = (managerId: string) => {
    const manager = employees.find(emp => emp.id === managerId);
    return manager ? manager.name : 'Não definido';
  };

  const getDepartmentEmployees = (department: Department) => {
    return employees.filter(emp => department.employeeIds.includes(emp.id || ''));
  };

  const handleViewEmployees = (department: Department) => {
    setSelectedDepartment(department);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDepartment(null);
  };

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Departamentos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddNew}
          sx={{ fontWeight: 600 }}
          fullWidth={isMobile}
        >
          Novo Departamento
        </Button>
      </Stack>

      {isMobile ? (
        <Stack spacing={2}>
          {departments.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                Nenhum departamento cadastrado. Clique em "Novo Departamento" para começar.
              </Typography>
            </Paper>
          ) : (
            departments.map((department) => (
              <Card key={department.id} variant="outlined">
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1" fontWeight={600}>
                        {department.name}
                      </Typography>
                      <Chip
                        icon={<GroupIcon />}
                        label={`${getEmployeeCount(department.employeeIds)}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Stack>
                    
                    <Typography variant="body2" color="text.secondary">
                      Gestor: {getManagerName(department.managerId)}
                    </Typography>
                    
                    <Stack direction="row" spacing={1} justifyContent="space-between">
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<GroupIcon />}
                        onClick={() => handleViewEmployees(department)}
                      >
                        Ver Equipe
                      </Button>
                      <Stack direction="row" spacing={0.5}>
                        <IconButton
                          size="small"
                          onClick={() => onEdit(department)}
                          color="primary"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => onDelete(department.id!)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      ) : (
        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.100' }}>
                <TableCell sx={{ fontWeight: 600 }}>Departamento</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Gestor</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Colaboradores</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">
                      Nenhum departamento cadastrado. Clique em "Novo Departamento" para começar.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                departments.map((department) => (
                  <TableRow key={department.id} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                          <BusinessIcon fontSize="small" />
                        </Avatar>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {department.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {getManagerName(department.managerId)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Chip
                          size="small"
                          label={`${getEmployeeCount(department.employeeIds)}`}
                          color="primary"
                          variant="outlined"
                        />
                        <Button
                          size="small"
                          variant="text"
                          startIcon={<GroupIcon />}
                          onClick={() => handleViewEmployees(department)}
                        >
                          Ver Equipe
                        </Button>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        <IconButton
                          size="small"
                          onClick={() => onEdit(department)}
                          color="primary"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => onDelete(department.id!)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <BusinessIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">{selectedDepartment?.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Gestor: {selectedDepartment ? getManagerName(selectedDepartment.managerId) : ''}
                </Typography>
              </Box>
            </Stack>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {selectedDepartment && (
            <List>
              {getDepartmentEmployees(selectedDepartment).length === 0 ? (
                <ListItem>
                  <ListItemText 
                    primary="Nenhum colaborador cadastrado neste departamento"
                    secondary="Adicione colaboradores editando o departamento"
                  />
                </ListItem>
              ) : (
                getDepartmentEmployees(selectedDepartment).map((employee) => (
                  <ListItem key={employee.id}>
                    <ListItemAvatar>
                      <Avatar 
                        sx={{ 
                          bgcolor: employee.active ? 'success.light' : 'grey.400',
                          width: 40, 
                          height: 40 
                        }}
                      >
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={employee.name}
                      secondary={
                        <Stack spacing={0.5}>
                          <Typography variant="body2" color="text.primary">
                            {employee.position}
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            <Chip 
                              label={employee.hierarchyLevel} 
                              size="small" 
                              color="primary" 
                              variant="outlined" 
                            />
                            <Chip 
                              label={employee.active ? 'Ativo' : 'Inativo'} 
                              size="small" 
                              color={employee.active ? 'success' : 'default'}
                              variant="outlined"
                            />
                          </Stack>
                        </Stack>
                      }
                    />
                  </ListItem>
                ))
              )}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} variant="outlined">
            Fechar
          </Button>
          {selectedDepartment && (
            <Button onClick={() => {
              handleCloseModal();
              onEdit(selectedDepartment);
            }} variant="contained">
              Editar Departamento
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};