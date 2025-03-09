import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              Loja de Páscoa
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Celebre a Páscoa com nossos produtos especiais
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              Links Úteis
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/sobre" color="text.secondary">
                Sobre Nós
              </Link>
              <Link component={RouterLink} to="/produtos" color="text.secondary">
                Produtos
              </Link>
              <Link component={RouterLink} to="/contato" color="text.secondary">
                Contato
              </Link>
              <Link component={RouterLink} to="/politica-privacidade" color="text.secondary">
                Política de Privacidade
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              Redes Sociais
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
              >
                <Facebook />
              </IconButton>
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
              >
                <Instagram />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
              >
                <Twitter />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
          © {currentYear} Loja de Páscoa. Todos os direitos reservados.
        </Typography>
      </Container>
    </Box>
  );
};
