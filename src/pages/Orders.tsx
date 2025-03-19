import { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { getOrders } from '../services/orders';
import { Order } from '../types/orders';
import { getStatusTranslation } from '../types/status';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

export const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.id) {
        try {
          const data = await getOrders(user.id);
          setOrders(data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'created':
        return 'info';
      case 'in_preparation':
        return 'warning';
      case 'waiting_for_retreat':
        return 'secondary';
      case 'finished':
        return 'success';
      default:
        return 'default';
    }
  };

  if (!user) {
    return (
      <Layout>
        <Container maxWidth="lg">
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Faça login para ver seus pedidos
            </Typography>
          </Box>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ mb: 4, color: 'text.primary' }}>
          Meus Pedidos
        </Typography>

        {orders.length === 0 ? (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Você ainda não tem pedidos
            </Typography>
          </Box>
        ) : isMobile ? (
          <Grid container spacing={2}>
            {orders.map(order => (
              <Grid item xs={12} key={order.id}>
                <Card sx={{ cursor: 'pointer' }} onClick={() => setSelectedOrder(order)}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Pedido #{order.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Data: {new Date(order.created_at!).toLocaleDateString('pt-BR')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Valor Total:{' '}
                      {order.full_price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Chip
                        label={getStatusTranslation(
                          order.statuses?.status_name || order.status || ''
                        )}
                        color={getStatusColor(order.status || '')}
                        size="small"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 2, mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Número do Pedido</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Valor Total</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <TableRow
                    key={order.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{new Date(order.created_at!).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      {order.full_price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusTranslation(
                          order.statuses?.status_name || order.status || ''
                        )}
                        color={getStatusColor(order.status || '')}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Dialog
          open={Boolean(selectedOrder)}
          onClose={() => setSelectedOrder(null)}
          maxWidth="sm"
          fullWidth
        >
          {selectedOrder && (
            <>
              <DialogTitle sx={{ pr: 6 }}>
                Detalhes do Pedido #{selectedOrder.id}
                <IconButton
                  aria-label="close"
                  onClick={() => setSelectedOrder(null)}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Data do Pedido
                  </Typography>
                  <Typography variant="body1">
                    {new Date(selectedOrder.created_at!).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Status do Pedido
                  </Typography>
                  <Chip
                    label={getStatusTranslation(
                      selectedOrder.statuses?.status_name || selectedOrder.status || ''
                    )}
                    color={getStatusColor(selectedOrder.status || '')}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Valor Total
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {selectedOrder.full_price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Produtos
                  </Typography>
                  <Grid container spacing={2}>
                    {selectedOrder.order_product?.map(orderProduct => (
                      <Grid item xs={12} key={orderProduct.products?.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            component="img"
                            src={orderProduct.products?.image_url}
                            alt={orderProduct.products?.name}
                            sx={{
                              width: 80,
                              height: 80,
                              objectFit: 'cover',
                              borderRadius: 1,
                            }}
                          />
                          <Box>
                            <Typography variant="subtitle2">
                              {orderProduct.products?.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Quantidade: {orderProduct.product_quantity}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </DialogContent>
            </>
          )}
        </Dialog>
      </Container>
    </Layout>
  );
};
