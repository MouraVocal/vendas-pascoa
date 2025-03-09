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
} from '@mui/material';
import { ShoppingCart, Menu } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Início', path: '/' },
    { text: 'Produtos', path: '/produtos' },
    { text: 'Sobre', path: '/sobre' },
    { text: 'Contato', path: '/contato' },
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
            <Menu />
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
          Loja de Páscoa
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

        <IconButton
          color="primary"
          aria-label="cart"
          component={Link}
          to="/carrinho"
          sx={{ ml: 2 }}
        >
          <Badge badgeContent={0} color="secondary">
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};
