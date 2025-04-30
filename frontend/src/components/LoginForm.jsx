import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Material UI
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Container, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/login', form);
      login(data.token);
      navigate('profile', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Error en el login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(/login/login.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{
          width: { xs: '100%', sm: 400 },
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}>
          <CardContent>
            <form onSubmit={onSubmit}>
              <Stack spacing={2} justifyContent="center" alignItems="center">
                <Typography variant="h4" component="h2">
                  Iniciar sesión
                </Typography>
                <TextField
                  required
                  id="username"
                  name="username"
                  label="Usuario"
                  variant="standard"
                  value={form.username}
                  onChange={onChange}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                      onInvalid: (e) =>
                        e.target.setCustomValidity('Por favor ingresa tu nombre de usuario'),
                      onInput: (e) => e.target.setCustomValidity(''),
                    },

                  }}
                />
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Contraseña"
                  variant="standard"
                  type="password"
                  value={form.password}
                  onChange={onChange}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon />
                        </InputAdornment>
                      ),
                      onInvalid: (e) =>
                        e.target.setCustomValidity('Por favor ingresa tu contraseña'),
                      onInput: (e) => e.target.setCustomValidity(''),
                    },
                  }}
                />
                <Button
                  loading={loading}
                  variant="contained"
                  color="secondary"
                  type="submit"
                  startIcon={<LoginIcon />}
                >
                  Iniciar sesión
                </Button>
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
