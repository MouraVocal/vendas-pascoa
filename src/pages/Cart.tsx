import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Layout } from '../components/layout/Layout';
import { useCartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createOrder } from '../services/orders';
import { supabase } from '../lib/supabase';
import { useState } from 'react';
import { getCacheBustedImageUrl } from '../utils/imageCacheBuster';
import { AuthDialog } from '../components/AuthDialog';

export const Cart = () => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartContext();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const [orderSummary, setOrderSummary] = useState<{ id: string; items: typeof items }>({
    id: '',
    items: [],
  });

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
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/produtos')}
              sx={{ mt: 2 }}
            >
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
                  src={getCacheBustedImageUrl(product.image_url)}
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
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                  onClick={async () => {
                    if (!user) {
                      setOpenAuthDialog(true);
                      return;
                    }
                    try {
                      const order = await createOrder(
                        {
                          full_price: total,
                          updated_by: user.id,
                          user_id: user.id,
                        },
                        items.map(item => ({
                          product_id: item.product.id!,
                          product_quantity: item.quantity,
                          order: '',
                        }))
                      );
                      setOrderSummary({ id: order.id!, items: [...items] });
                      setOpenSuccessModal(true);
                      // Clear cart after modal is shown to preserve order summary
                      setTimeout(() => {
                        navigate('/meus-pedidos');
                      }, 10000);
                    } catch (error) {
                      console.error('Error creating order:', error);
                    }
                  }}
                >
                  Finalizar Compra
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => {
                    navigate('/produtos');
                  }}
                  sx={{ mt: 2 }}
                >
                  Continuar Comprando
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Dialog
        open={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 700 }}>
          Pedido Realizado com Sucesso! 🎉
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Resumo do Pedido #{orderSummary.id}
          </Typography>
          {orderSummary.items.map(({ product, quantity }) => (
            <Box
              key={product.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  component="img"
                  src={getCacheBustedImageUrl(product.image_url)}
                  alt={product.name}
                  sx={{ width: 50, height: 50, objectFit: 'contain' }}
                />
                <Box>
                  <Typography variant="subtitle1">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantidade: {quantity}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="subtitle1" color="primary.main">
                R$ {(product.price * quantity).toFixed(2)}
              </Typography>
            </Box>
          ))}
          <Box
            sx={{
              mt: 3,
              p: 2,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">R$ {total.toFixed(2)}</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, flexDirection: 'column', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              clearCart();
              navigate('/meus-pedidos');
              setOpenSuccessModal(false);
            }}
            sx={{ py: 1.5 }}
          >
            Ver Meus Pedidos
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => {
              clearCart();
              navigate('/produtos');
              setOpenSuccessModal(false);
            }}
            sx={{ py: 1.5 }}
          >
            Continuar Comprando
          </Button>
        </DialogActions>
      </Dialog>
      <AuthDialog
        open={openAuthDialog}
        onClose={() => setOpenAuthDialog(false)}
        onSuccess={async () => {
          const {
            data: { user: currentUser },
          } = await supabase.auth.getUser();
          if (!currentUser) {
            throw new Error('User not found');
          }
          const order = await createOrder(
            {
              full_price: total,
              updated_by: currentUser.id,
              user_id: currentUser.id,
            },
            items.map(item => ({
              product_id: item.product.id!,
              product_quantity: item.quantity,
              order: '',
            }))
          );
          setOrderSummary({ id: order.id!, items: [...items] });
          setOpenSuccessModal(true);
          setTimeout(() => {
            navigate('/meus-pedidos');
          }, 10000);
        }}
      />
    </Layout>
  );
};
