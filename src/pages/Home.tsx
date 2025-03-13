import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
} from '@mui/material';
import { Layout } from '../components/layout/Layout';
import { useDataContext } from '../contexts/DataContext';
import { useCartContext } from '../contexts/CartContext';

export const Home = () => {
  const { products, loading, error, siteSettings } = useDataContext();
  const { addItem } = useCartContext();

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
              Explorar Produtos
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {highlightedProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 280,
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                  image={product.image_url}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {product.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                    }}
                  >
                    R$ {product.price.toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => addItem(product)}
                    sx={{
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                  >
                    Adicionar ao Carrinho
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

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
