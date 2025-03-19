import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ShoppingCart,
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  Person,
} from '@mui/icons-material';
import { useState } from 'react';
import { LoginDialog } from '../auth/LoginDialog';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useCartContext } from '../../contexts/CartContext';

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { itemCount } = useCartContext();
  const { user, signOut } = useAuth();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleMenuClose();
    signOut();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Início', path: '/' },
    { text: 'Produtos', path: '/produtos' },
  ];

  const drawer = (
    <List>
      {menuItems.map(item => (
        <ListItem key={item.text} component={Link} to={item.path} onClick={handleDrawerToggle}>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'background.paper' }}>
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: 'primary.main' }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'primary.main',
            fontWeight: 700,
          }}
        >
          Lojinha da Cléo
        </Typography>

        {!isMobile && (
          <div style={{ display: 'flex', gap: '1rem' }}>
            {menuItems.map(item => (
              <Button key={item.text} component={Link} to={item.path} color="primary">
                {item.text}
              </Button>
            ))}
          </div>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={toggleTheme}
            color="primary"
            sx={{ ml: 1 }}
            aria-label="toggle dark mode"
          >
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {user ? (
            <>
              <Button
                color="primary"
                onClick={handleMenuClick}
                sx={{ ml: 1 }}
                startIcon={<Person />}
              >
                Olá, {user.user_metadata?.name || 'Usuário'}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem component={Link} to="/meus-pedidos" onClick={handleMenuClose}>
                  Ver meus pedidos
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Sair</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="primary" onClick={() => setLoginDialogOpen(true)} sx={{ ml: 1 }}>
              Entrar
            </Button>
          )}
        </Box>

        <IconButton
          color="primary"
          aria-label="cart"
          component={Link}
          to="/carrinho"
          sx={{ ml: 1 }}
        >
          <Badge badgeContent={itemCount} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>

        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              bgcolor: 'background.paper',
              borderRight: 1,
              borderColor: 'divider',
              '& .MuiListItem-root': {
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              },
              '& .MuiListItemText-primary': {
                color: 'text.primary',
                fontWeight: 500,
              },
            },
          }}
        >
          {drawer}
        </Drawer>

        <LoginDialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)} />
      </Toolbar>
    </AppBar>
  );
};
