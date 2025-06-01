import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router';
import AppRoutes from './routes/AppRoutes';


const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
  </AuthProvider>
);

export default App
