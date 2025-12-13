import { Box, Button, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon, ArrowBack } from '@mui/icons-material';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 3,
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: 600,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '6rem', md: '10rem' },
            fontWeight: 'bold',
            color: 'white',
            mb: 2,
            textShadow: '4px 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color: 'white',
            mb: 2,
            fontWeight: 600,
          }}
        >
          Página não encontrada
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255,255,255,0.9)',
            mb: 4,
          }}
        >
          Desculpe, a página que você está procurando não existe ou foi movida.
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            Voltar
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{
              borderColor: 'white',
              color: 'white',
              fontWeight: 600,
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Ir para Home
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
