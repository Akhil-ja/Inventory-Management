import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import GlobalSnackbar from './components/GlobalSnackbar';

function App() {
  return (
    <Router>
      <AppRoutes />
      <GlobalSnackbar />
    </Router>
  );
}

export default App;
