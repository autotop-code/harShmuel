import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Home from './pages/Home';
import AccommodationDetail from './pages/AccommodationDetail';
import Header from './components/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50',
      light: '#3498db',
      dark: '#2980b9',
    },
    secondary: {
      main: '#e74c3c',
      light: '#f06292',
      dark: '#c2185b',
    },
    background: {
      default: '#f5f6fa',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 24px',
          fontSize: '1rem',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Box sx={{ minHeight: '100vh', pb: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accommodation/:id" element={<AccommodationDetail />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;