import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { HighlightedProductCard } from '../components/HighlightedProductCard';
import { Layout } from '../components/layout/Layout';
import { useDataContext } from '../contexts/DataContext';

export const Home = () => {
  const { products, loading, error, siteSettings } = useDataContext();

  if (loading) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Typography color="error">{error}</Typography>
        </Box>
      </Layout>
    );
  }

  const highlightedProducts = products.filter(product => product.is_highlighted);

  return (
    <Layout>
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          mb: 4,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h1"
            align="center"
            color="primary"
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              mb: 3,
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {siteSettings?.title || 'Celebre a Páscoa com Alegria'}
          </Typography>
          <Typography
            variant="h2"
            align="center"
            color="text.secondary"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              mb: 6,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.4,
            }}
          >
            {siteSettings?.subtitle ||
              'Descubra nossa seleção especial de produtos para tornar sua Páscoa ainda mais doce'}
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="/vendas-pascoa/produtos"
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.25rem',
                borderRadius: '30px',
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                },
              }}
            >
              Ver Todos Produtos
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Carousel
            sx={{
              width: '100%',
              '& .MuiCarousel-indicators': {
                mt: 2,
              },
              '& .MuiPaper-root': {
                height: 'auto',
              },
            }}
            autoPlay
            interval={5000}
            animation="slide"
            indicators
            navButtonsAlwaysVisible
          >
            {highlightedProducts.map(product => (
              <HighlightedProductCard key={product.id} product={product} />
            ))}
          </Carousel>
        </Box>

        <Box
          sx={{
            mt: 6,
            mb: 4,
            textAlign: 'center',
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            size="large"
            href="/vendas-pascoa/produtos"
            sx={{
              px: 4,
              py: 1.5,
            }}
          >
            Ver Todos os Produtos
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};
