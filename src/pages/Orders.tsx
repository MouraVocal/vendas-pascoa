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
} from '@mui/material';

export const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

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
                  <TableRow key={order.id}>
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
      </Container>
    </Layout>
  );
};
