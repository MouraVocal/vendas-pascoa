import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Alert,
  Box,
  Link as MuiLink,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

type LoginDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await signIn(formData.email, formData.password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', color: 'primary.main' }}>Login</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            required
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            disabled={loading}
          />
          <TextField
            margin="dense"
            label="Senha"
            type="password"
            fullWidth
            required
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            disabled={loading}
          />
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <MuiLink component={Link} to="/signup" onClick={onClose} variant="body2">
              Não tem uma conta? Cadastre-se
            </MuiLink>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
