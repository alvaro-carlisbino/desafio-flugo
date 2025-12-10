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
  Avatar,
  Chip,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Employee } from '../../models/Employee';

interface EmployeeListProps {
  employees: Employee[];
  onAddNew: () => void;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export const EmployeeList = ({ employees, onAddNew, onEdit, onDelete }: EmployeeListProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Colaboradores
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddNew}
          sx={{ fontWeight: 600 }}
        >
          Novo Colaborador
        </Button>
      </Stack>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid rgba(145, 158, 171, 0.12)' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Departamento</TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                  <Typography color="text.secondary">
                    Nenhum colaborador cadastrado. Clique em "Novo Colaborador" para começar.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee) => (
                <TableRow
                  key={employee.id}
                  sx={{
                    '&:hover': { bgcolor: 'action.hover' },
                    '&:last-child td': { borderBottom: 0 },
                  }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: 'grey.300', color: 'text.primary', width: 40, height: 40 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {getInitials(employee.name)}
                        </Typography>
                      </Avatar>
                      <Typography variant="body2">{employee.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {employee.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {employee.department}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={employee.active ? 'Ativo' : 'Inativo'}
                      size="small"
                      color={employee.active ? 'success' : 'error'}
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton
                        size="small"
                        onClick={() => onEdit(employee)}
                        sx={{
                          '&:hover': { bgcolor: 'action.hover' },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => onDelete(employee.id)}
                        sx={{
                          color: 'error.main',
                          '&:hover': { bgcolor: 'error.lighter' },
                        }}
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
    </Box>
  );
};
