import { ReactNode } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
} from '@mui/material';
import { People as PeopleIcon, Business as BusinessIcon, AccountCircle } from '@mui/icons-material';

const drawerWidth = 280;

interface MainLayoutProps {
  children: ReactNode;
  onNavigate: () => void;
}

export const MainLayout = ({ children, onNavigate }: MainLayoutProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: 'white',
          color: 'text.primary',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton>
            <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px dashed rgba(145, 158, 171, 0.2)',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <BusinessIcon sx={{ color: 'primary.main', fontSize: 28 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Flugo
          </Typography>
        </Box>

        <List sx={{ px: 2 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={onNavigate}
              sx={{
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon>
                <PeopleIcon sx={{ color: 'text.secondary' }} />
              </ListItemIcon>
              <ListItemText
                primary="Colaboradores"
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'text.secondary',
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 5,
          mt: 10,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
