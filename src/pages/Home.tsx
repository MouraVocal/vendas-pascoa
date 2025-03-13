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
          bgcolor: 'easter.light',
          py: { xs: 4, md: 8 },
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            align="center"
            color="primary"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 3,
            }}
          >
            {siteSettings?.title || 'Celebre a Páscoa com Alegria'}
          </Typography>
          <Typography
            variant="h2"
            align="center"
            color="text.secondary"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              mb: 4,
            }}
          >
            {siteSettings?.subtitle ||
              'Descubra nossa seleção especial de produtos para tornar sua Páscoa ainda mais doce'}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Typography
          variant="h2"
          color="primary"
          gutterBottom
          sx={{
            fontSize: { xs: '1.75rem', md: '2.25rem' },
            mb: 4,
          }}
        >
          Produtos em Destaque
        </Typography>

        <Grid container spacing={3}>
          {highlightedProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image_url}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    R$ {product.price.toFixed(2)}
                  </Typography>
                  <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
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
            href="/produtos"
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
