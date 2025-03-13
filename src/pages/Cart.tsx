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

export const Cart = () => {
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
            <Typography variant="h5" gutterBottom>
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
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
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
                  alignItems: 'center',
                  p: 2,
                }}
              >
                <Box
                  component="img"
                  src={product.image_url}
                  alt={product.name}
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: 'contain',
                    mr: 2,
                  }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    R$ {product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(Number(product.id), quantity - 1)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ minWidth: '40px', textAlign: 'center' }}>{quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(Number(product.id), quantity + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => removeItem(Number(product.id))}
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
                    R$ {total.toFixed(2)}
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
                  href="/"
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
