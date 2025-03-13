import { Box, Fab, Paper, IconButton } from '@mui/material';
import { Header } from './Header';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';
import { useDataContext } from '../../contexts/DataContext';
import { useState, useEffect } from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const { siteSettings } = useDataContext();
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (hasVisited) {
      setShowBubble(false);
    }
  }, []);

  const handleCloseBubble = () => {
    setShowBubble(false);
    localStorage.setItem('hasVisitedBefore', 'true');
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = siteSettings?.whatsapp_number || '';
    if (!phoneNumber) return;

    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os produtos de Páscoa!');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/vendas-pascoa/background-2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15,
          zIndex: -1,
        },
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          px: { xs: 2, sm: 3 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </Box>
      <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 2 }}>
        {showBubble && (
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              bottom: '100%',
              right: 0,
              mb: 2,
              borderRadius: 4,
              width: 280,
              p: 3,
              lineHeight: 1.8,
              bgcolor: '#DCF8C6',
              border: '2px solid #25D366',
              fontFamily: '"Comic Sans MS", "Segoe UI", "Roboto", sans-serif',
              fontSize: '1.1rem',
              color: '#075E54',
              boxShadow: '0 8px 24px rgba(37, 211, 102, 0.15)',
              transform: 'scale(1)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -12,
                right: 24,
                width: 0,
                height: 0,
                borderLeft: '12px solid transparent',
                borderRight: '12px solid transparent',
                borderTop: '12px solid #DCF8C6',
                filter: 'drop-shadow(0 4px 8px rgba(37, 211, 102, 0.1))',
              },
            }}
          >
            <IconButton
              size="small"
              onClick={handleCloseBubble}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: '#075E54',
                '&:hover': {
                  bgcolor: 'rgba(7, 94, 84, 0.1)',
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            💬 Oii! Posso te ajudar a escolher os melhores produtos de Páscoa? Vamos conversar! 🐰✨
          </Paper>
        )}
        <Fab
          color="secondary"
          aria-label="whatsapp"
          onClick={handleWhatsAppClick}
          sx={{
            bgcolor: '#25D366',
            '&:hover': {
              bgcolor: '#128C7E',
            },
          }}
        >
          <WhatsAppIcon />
        </Fab>
      </Box>
    </Box>
  );
};
