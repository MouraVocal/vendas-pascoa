import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
  Button,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Layout } from '../components/layout/Layout';
import { useCartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, total } = useCartContext();

  if (items.length === 0) {
    return (
      <Layout>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: 8,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ mb: 4, color: 'text.primary' }}>
              Seu carrinho está vazio
            </Typography>
            <Button variant="contained" color="primary" href="/" sx={{ mt: 2 }}>
              Continuar Comprando
            </Button>
          </Box>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ mb: 4, color: 'text.primary' }}>
          Carrinho de Compras
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {items.map(({ product, quantity }) => (
              <Card
                key={product.id}
                sx={{
                  mb: 2,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'stretch', sm: 'center' },
                  p: 2,
                }}
              >
                <Box
                  component="img"
                  src={product.image_url}
                  alt={product.name}
                  sx={{
                    width: { xs: '100%', sm: 100 },
                    height: { xs: 200, sm: 100 },
                    objectFit: 'contain',
                    mb: { xs: 2, sm: 0 },
                    mr: { xs: 0, sm: 2 },
                  }}
                />
                <CardContent sx={{ flex: 1, px: { xs: 0, sm: 2 } }}>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    R${' '}
                    {product.price.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'center', sm: 'flex-end' },
                    gap: 1,
                    mt: { xs: 2, sm: 0 },
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(product.id ?? '', quantity - 1)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ minWidth: '40px', textAlign: 'center' }}>{quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(product.id ?? '', quantity + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => removeItem(product.id ?? '')}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: '24px' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Resumo do Pedido
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Typography variant="body1">Total:</Typography>
                  <Typography variant="h6" color="primary">
                    R${' '}
                    {total.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                </Box>
                <Button variant="contained" color="primary" fullWidth size="large" sx={{ mt: 2 }}>
                  Finalizar Compra
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => navigate('/')}
                  sx={{ mt: 2 }}
                >
                  Continuar Comprando
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
