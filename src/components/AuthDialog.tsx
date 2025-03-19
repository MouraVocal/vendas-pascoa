import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthDialog = ({ open, onClose, onSuccess }: AuthDialogProps) => {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(email, password);
    if (error) {
      setError('Email ou senha inválidos');
      setLoading(false);
      return;
    }

    try {
      await onSuccess();
      setLoading(false);
      onClose();
    } catch (error) {
      console.error('Error after login:', error);
      setError('Erro ao finalizar o pedido');
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signUp(email, password, name, phone);
    if (error) {
      setError('Erro ao criar conta. Verifique os dados e tente novamente.');
      setLoading(false);
      return;
    }

    try {
      await onSuccess();
      setLoading(false);
      onClose();
    } catch (error) {
      console.error('Error after signup:', error);
      setError('Erro ao finalizar o pedido');
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ p: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
          Bem-vindo à nossa loja!
        </Typography>
        <Typography variant="body1">
          Crie uma conta ou faça login para acompanhar seus pedidos e receber atualizações
          importantes sobre suas compras. Estamos aqui para ajudar você em toda sua jornada!
        </Typography>
      </Box>
      <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Login" />
          <Tab label="Criar Conta" />
        </Tabs>
      </DialogTitle>
      <DialogContent>
        {error && (
          <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        <TabPanel value={tab} index={0}>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Entrar'}
            </Button>
          </form>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <form onSubmit={handleSignUp}>
            <TextField
              fullWidth
              label="Nome"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Telefone"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Criar Conta'}
            </Button>
          </form>
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};
