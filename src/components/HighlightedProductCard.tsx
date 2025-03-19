import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Product } from '../types';
import { useCartContext } from '../contexts/CartContext';
import { supabase } from '../lib/supabase';
import { getCacheBustedImageUrl } from '../utils/imageCacheBuster';

type HighlightedProductCardProps = {
  product: Product;
};

export const HighlightedProductCard = ({
  product: initialProduct,
}: HighlightedProductCardProps) => {
  const { addItem } = useCartContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [product, setProduct] = useState(initialProduct);

  useEffect(() => {
    const channel = supabase
      .channel('product-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products',
          filter: `id=eq.${initialProduct.id}`,
        },
        payload => {
          setProduct(payload.new as Product);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [initialProduct.id]);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setOpenSnackbar(true);
    setDialogOpen(false);
    setQuantity(1);
  };

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          transition: 'all 0.3s ease-in-out',
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          bgcolor: 'background.paper',
          position: 'relative',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: '100%', md: '50%' },
            height: { xs: 280, md: 400 },
            objectFit: 'contain',
            bgcolor: 'background.paper',
          }}
          image={getCacheBustedImageUrl(product.image_url)}
          alt={product.name}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 4,
            width: { xs: '100%', md: '50%' },
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: 'primary.main',
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.6 }}
          >
            {product.description}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: 'secondary.main',
            }}
          >
            R${' '}
            {product.price.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setDialogOpen(true)}
            sx={{
              py: 2,
              px: 4,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
              },
            }}
          >
            Adicionar ao Carrinho
          </Button>
        </CardContent>
      </Card>

      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setQuantity(1);
        }}
        maxWidth="xs"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: 3,
            p: 2,
            zIndex: 1500,
            backgroundColor: 'background.paper',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          },
        }}
      >
        <DialogContent>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mb: 3,
              fontFamily: '"Comic Sans MS", "Segoe UI", "Roboto", sans-serif',
              color: 'primary.main',
            }}
          >
            Quantos você quer levar? 🛍️
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mb: 3,
            }}
          >
            <IconButton
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              color="primary"
              size="large"
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="h5" sx={{ minWidth: '60px', textAlign: 'center' }}>
              {quantity}
            </Typography>
            <IconButton onClick={() => handleQuantityChange(1)} color="primary" size="large">
              <AddIcon />
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddToCart}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontFamily: '"Comic Sans MS", "Segoe UI", "Roboto", sans-serif',
            }}
          >
            Enviar para o Carrinho ✨
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{
            width: '100%',
            fontFamily: '"Comic Sans MS", "Segoe UI", "Roboto", sans-serif',
            '& .MuiAlert-message': {
              fontSize: '1rem',
            },
          }}
        >
          Produto adicionado ao carrinho! 🎉
        </Alert>
      </Snackbar>
    </>
  );
};
