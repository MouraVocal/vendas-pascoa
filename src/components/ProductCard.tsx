import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Collapse,
  Snackbar,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useState } from 'react';
import { Product } from '../types';
import { useCartContext } from '../contexts/CartContext';

type ProductCardProps = {
  product: Product;
  maxWidth?: number;
};

export const ProductCard = ({ product, maxWidth = 400 }: ProductCardProps) => {
  const { addItem } = useCartContext();
  const [expanded, setExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (!expanded) {
      setQuantity(1);
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setOpenSnackbar(true);
    setExpanded(false);
    setQuantity(1);
  };

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease-in-out',
          borderRadius: 3,
          overflow: 'visible',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          mx: 'auto',
          maxWidth,
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
            R${' '}
            {product.price.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleExpandClick}
            sx={{
              py: 1.5,
              textTransform: 'none',
              fontSize: '1rem',
              bgcolor: expanded ? 'secondary.main' : 'primary.main',
              '&:hover': {
                bgcolor: expanded ? 'secondary.dark' : 'primary.dark',
              },
            }}
          >
            {expanded ? 'Cancelar' : 'Adicionar ao Carrinho'}
          </Button>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 2,
                border: '2px solid',
                borderColor: 'primary.main',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
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
                }}
              >
                <IconButton
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  color="primary"
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="h6" sx={{ minWidth: '40px', textAlign: 'center' }}>
                  {quantity}
                </Typography>
                <IconButton onClick={() => handleQuantityChange(1)} color="primary">
                  <AddIcon />
                </IconButton>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddToCart}
                sx={{
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontFamily: '"Comic Sans MS", "Segoe UI", "Roboto", sans-serif',
                }}
              >
                Enviar para o Carrinho ✨
              </Button>
            </Box>
          </Collapse>
        </CardContent>
      </Card>

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
          {quantity > 1
            ? `${quantity}x ${product.name} enviados ao carrinho com sucesso! 🎉`
            : `${product.name} enviado ao carrinho com sucesso! 🎉`}
        </Alert>
      </Snackbar>
    </>
  );
};
