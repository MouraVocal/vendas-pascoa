import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { Layout } from '../components/layout/Layout';
import { ProductCard } from '../components/ProductCard';
import { useDataContext } from '../contexts/DataContext';

export const Products = () => {
  const { products, loading, error } = useDataContext();

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

  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          align="center"
          color="primary"
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            mb: 4,
          }}
        >
          Nossos Produtos
        </Typography>

        <Grid container spacing={3}>
          {products.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};
