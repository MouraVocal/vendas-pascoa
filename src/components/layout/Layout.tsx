import { Box, Fab } from '@mui/material';
import { Header } from './Header';
import { Footer } from './Footer';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const handleWhatsAppClick = () => {
    window.open(
      'https://wa.me/5511957738663?text=Olá! Gostaria de saber mais sobre os produtos de Páscoa.',
      '_blank'
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          px: { xs: 2, sm: 3 },
        }}
      >
        {children}
      </Box>
      <Footer />
      <Fab
        color="secondary"
        aria-label="whatsapp"
        onClick={handleWhatsAppClick}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: '#25D366',
          '&:hover': {
            bgcolor: '#128C7E',
          },
        }}
      >
        <WhatsAppIcon />
      </Fab>
    </Box>
  );
};
