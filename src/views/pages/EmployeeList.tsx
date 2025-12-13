import { useState, useMemo } from 'react';
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
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Divider,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  DeleteSweep as DeleteSweepIcon,
} from '@mui/icons-material';
import { Employee } from '../../models/Employee';
import { useDepartmentViewModel } from '../../viewmodels/DepartmentViewModel';

interface EmployeeListProps {
  employees: Employee[];
  onAddNew: () => void;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  onDeleteMultiple?: (ids: string[]) => void;
}

export const EmployeeList = ({ employees, onAddNew, onEdit, onDelete, onDeleteMultiple }: EmployeeListProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { departments } = useDepartmentViewModel();
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesName = employee.name.toLowerCase().includes(searchName.toLowerCase());
      const matchesEmail = employee.email.toLowerCase().includes(searchEmail.toLowerCase());
      const matchesDepartment = filterDepartment === '' || employee.department === filterDepartment;
      return matchesName && matchesEmail && matchesDepartment;
    });
  }, [employees, searchName, searchEmail, filterDepartment]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIds(filteredEmployees.map(emp => emp.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(empId => empId !== id) : [...prev, id]
    );
  };

  const handleDeleteMultiple = () => {
    if (onDeleteMultiple && selectedIds.length > 0) {
      onDeleteMultiple(selectedIds);
      setSelectedIds([]);
      setDeleteDialogOpen(false);
    }
  };

  const isAllSelected = filteredEmployees.length > 0 && selectedIds.length === filteredEmployees.length;
  const isSomeSelected = selectedIds.length > 0 && selectedIds.length < filteredEmployees.length;

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
          Colaboradores
        </Typography>
        <Stack direction="row" spacing={1}>
          {selectedIds.length > 0 && onDeleteMultiple && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteSweepIcon />}
              onClick={() => setDeleteDialogOpen(true)}
              sx={{ fontWeight: 600 }}
            >
              Excluir {selectedIds.length}
            </Button>
          )}

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddNew}
            sx={{ fontWeight: 600 }}
            fullWidth={isMobile && selectedIds.length === 0}
          >
            Novo Colaborador
          </Button>
        </Stack>
      </Stack>

      {selectedIds.length > 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {selectedIds.length} colaborador(es) selecionado(s)
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 3 }} elevation={0}>
        <Stack spacing={2}>
          <Typography variant="subtitle2" fontWeight={600}>
            Filtros
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              size="small"
              placeholder="Buscar por nome..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ flex: 1 }}
            />
            <TextField
              size="small"
              placeholder="Buscar por e-mail..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ flex: 1 }}
            />
            <FormControl size="small" sx={{ flex: 1, minWidth: 200 }}>
              <InputLabel>Departamento</InputLabel>
              <Select
                value={filterDepartment}
                label="Departamento"
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.name}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Paper>

      {isMobile ? (
        <Stack spacing={2}>
          {filteredEmployees.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                {employees.length === 0
                  ? 'Nenhum colaborador cadastrado. Clique em "Novo Colaborador" para começar.'
                  : 'Nenhum colaborador encontrado com os filtros aplicados.'}
              </Typography>
            </Paper>
          ) : (
            filteredEmployees.map((employee) => (
              <Card key={employee.id} variant="outlined">
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: 'grey.300', color: 'text.primary', width: 48, height: 48 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {getInitials(employee.name)}
                        </Typography>
                      </Avatar>
                      <Box flex={1}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {employee.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {employee.email}
                        </Typography>
                      </Box>
                    </Stack>

                    <Divider />

                    <Stack spacing={1}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Cargo
                          </Typography>
                          <Typography variant="body2" fontWeight={500}>
                            {employee.position || 'Não informado'}
                          </Typography>
                        </Box>
                        <Chip
                          label={employee.hierarchyLevel?.charAt(0).toUpperCase() + employee.hierarchyLevel?.slice(1) || 'Não definido'}
                          size="small"
                          color={employee.hierarchyLevel === 'gestor' ? 'secondary' : 'primary'}
                          variant="outlined"
                        />
                      </Stack>

                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Departamento
                          </Typography>
                          <Typography variant="body2">
                            {employee.department}
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={0.5}>
                          <Chip
                            label={employee.active ? 'Ativo' : 'Inativo'}
                            size="small"
                            color={employee.active ? 'success' : 'error'}
                            sx={{ fontWeight: 600 }}
                          />
                          {employee.baseSalary && (
                            <Chip
                              label={`R$ ${employee.baseSalary.toLocaleString('pt-BR')}`}
                              size="small"
                              variant="outlined"
                              color="info"
                            />
                          )}
                        </Stack>
                      </Stack>
                    </Stack>

                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton
                        size="small"
                        onClick={() => onEdit(employee)}
                        sx={{ '&:hover': { bgcolor: 'action.hover' } }}
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
                  </Stack>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      ) : (
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid rgba(145, 158, 171, 0.12)' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                {onDeleteMultiple && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isAllSelected}
                      indeterminate={isSomeSelected}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                )}
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Cargo</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Departamento</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={onDeleteMultiple ? 7 : 6} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">
                      {employees.length === 0
                        ? 'Nenhum colaborador cadastrado. Clique em "Novo Colaborador" para começar.'
                        : 'Nenhum colaborador encontrado com os filtros aplicados.'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => (
                  <TableRow
                    key={employee.id}
                    sx={{
                      '&:hover': { bgcolor: 'action.hover' },
                      '&:last-child td': { borderBottom: 0 },
                    }}
                  >
                    {onDeleteMultiple && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedIds.includes(employee.id)}
                          onChange={() => handleSelectOne(employee.id)}
                        />
                      </TableCell>
                    )}
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
                      <Stack spacing={0.5}>
                        <Typography variant="body2" fontWeight={500}>
                          {employee.position || 'Não informado'}
                        </Typography>
                        <Chip
                          label={employee.hierarchyLevel?.charAt(0).toUpperCase() + employee.hierarchyLevel?.slice(1) || 'Não definido'}
                          size="small"
                          color={employee.hierarchyLevel === 'gestor' ? 'secondary' : 'primary'}
                          variant="outlined"
                          sx={{ fontSize: '0.75rem', height: 20 }}
                        />
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {employee.department}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={0.5}>
                        <Chip
                          label={employee.active ? 'Ativo' : 'Inativo'}
                          size="small"
                          color={employee.active ? 'success' : 'error'}
                          sx={{ fontWeight: 600 }}
                        />
                        {employee.baseSalary && (
                          <Chip
                            label={`R$ ${employee.baseSalary.toLocaleString('pt-BR')}`}
                            size="small"
                            variant="outlined"
                            color="info"
                            sx={{ fontSize: '0.75rem' }}
                          />
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton
                          size="small"
                          onClick={() => onEdit(employee)}
                          sx={{ '&:hover': { bgcolor: 'action.hover' } }}
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
      )}

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmar exclusão em massa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir {selectedIds.length} colaborador(es)?
            Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleDeleteMultiple} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
