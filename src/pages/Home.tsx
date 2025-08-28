
import { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccommodationCard from '../components/AccommodationCard';
import type { Accommodation } from '../types/accommodation';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Replace with actual API call
    const dummyData: Accommodation[] = [
      {
        id: 1,
        title: 'Luxury Beach Villa',
        description: 'Beautiful villa with stunning ocean views, perfect for family vacations.',
        price: 250,
        location: 'Tel Aviv Beach',
        images: ['https://via.placeholder.com/400x300?text=Luxury+Beach+Villa'],
        amenities: ['WiFi', 'Pool', 'Beach Access'],
        maxGuests: 6,
        bedrooms: 3,
        bathrooms: 2
      },
      {
        id: 2,
        title: 'City Center Apartment',
        description: 'Modern apartment in the heart of the city, close to all attractions.',
        price: 150,
        location: 'Jerusalem City Center',
        images: ['https://via.placeholder.com/400x300?text=City+Center+Apartment'],
        amenities: ['WiFi', 'Air Conditioning', 'Kitchen'],
        maxGuests: 4,
        bedrooms: 2,
        bathrooms: 1
      },
      // Add more dummy data as needed
    ];

    setAccommodations(dummyData);
  }, []);

  const handleView = (id: number) => {
    navigate(`/accommodation/${id}`);
  };

  const filteredAccommodations = accommodations.filter(acc => 
    acc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Box sx={{ 
        mb: 4, 
        textAlign: 'center',
        background: 'linear-gradient(to right, #2c3e50, #3498db)',
        borderRadius: '16px',
        py: 6,
        px: 2,
        color: 'white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Find Your Perfect Stay
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 4,
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '600px',
            mx: 'auto',
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}
        >
          Discover luxury accommodations for your dream vacation
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by location or property name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'grey.500' }} />
              </InputAdornment>
            ),
            sx: {
              backgroundColor: 'white',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'white',
              },
              maxWidth: '600px',
            }
          }}
          sx={{ 
            mx: 'auto',
            display: 'block',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.light',
              },
            },
          }}
        />
      </Box>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
        {filteredAccommodations.map((accommodation) => (
          <AccommodationCard 
            key={accommodation.id}
            accommodation={accommodation} 
            onView={handleView}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Home;