import { AppBar, Toolbar, Typography, IconButton, Container } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ 
      backgroundColor: 'white', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      mb: 2 
    }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
          <IconButton
            size="large"
            edge="start"
            onClick={() => navigate('/')}
            sx={{ color: 'primary.main' }}
          >
            <Home />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: 'text.primary',
              fontWeight: 600,
              fontSize: { xs: '1.1rem', sm: '1.3rem' }
            }}
          >
            Luxury Accommodations
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
