import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import Home from './components/Home';

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  console.log(children);
  return token ? children : <Navigate to="/login" />;
}

function Profile() {
  // al montar, podrías llamar a /profile con el header Authorization
  return <h2>Perfil protegido</h2>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* LOGIN */}
          <Route path="/login" element={<LoginForm />} />
          {/* HOME */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          {/* PROFILE */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
