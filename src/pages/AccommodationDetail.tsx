import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { 
  Hotel,
  Person,
  Bathtub,
  Wifi,
  Pool,
  Kitchen,
  LocationOn 
} from '@mui/icons-material';
import type { Accommodation } from '../types/accommodation';
import BookingCalendar from '../components/BookingCalendar';

const AccommodationDetail = () => {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
  const [images, setImages] = useState<{ original: string; thumbnail: string; }[]>([]);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchAccommodation = () => {
      const dummyAccommodation: Accommodation = {
        id: 1,
        title: 'Luxury Beach Villa',
        description: 'Beautiful villa with stunning ocean views, perfect for family vacations. Enjoy the private pool, fully equipped kitchen, and direct beach access. Experience the ultimate beachfront living with modern amenities and comfortable spaces.',
        price: 250,
        location: 'Tel Aviv Beach',
        images: [
          'https://via.placeholder.com/800x600?text=Beach+View',
          'https://via.placeholder.com/800x600?text=Living+Room',
          'https://via.placeholder.com/800x600?text=Kitchen',
        ],
        amenities: ['WiFi', 'Pool', 'Beach Access', 'Full Kitchen', 'Air Conditioning'],
        maxGuests: 6,
        bedrooms: 3,
        bathrooms: 2
      };

      setAccommodation(dummyAccommodation);
      
      // Convert images for react-image-gallery format
      const galleryImages = dummyAccommodation.images.map(img => ({
        original: img,
        thumbnail: img
      }));
      setImages(galleryImages);
    };

    fetchAccommodation();
  }, [id]);

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    
    // Calculate number of nights
    const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    setNumberOfNights(nights);
    
    // Calculate total price
    if (accommodation) {
      setTotalPrice(nights * accommodation.price);
    }
  };

  // Dummy booked dates for demonstration
  const bookedDates = [
    {
      startDate: new Date(2025, 8, 10),
      endDate: new Date(2025, 8, 15),
    },
    {
      startDate: new Date(2025, 8, 20),
      endDate: new Date(2025, 8, 25),
    },
  ];

  if (!accommodation) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  const amenityIcons: { [key: string]: React.ReactElement } = {
    'WiFi': <Wifi />,
    'Pool': <Pool />,
    'Beach Access': <Hotel />,
    'Full Kitchen': <Kitchen />,
    'Air Conditioning': <Bathtub />
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {accommodation.title}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <LocationOn color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" color="text.secondary">
          {accommodation.location}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <ImageGallery 
          items={images}
          showPlayButton={false}
          showFullscreenButton={true}
          showNav={true}
          thumbnailPosition="bottom"
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <Box flex={1} minWidth={300}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Description</Typography>
            <Typography color="text.secondary" paragraph>
              {accommodation.description}
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Details</Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText 
                  primary={`${accommodation.maxGuests} Guests maximum`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Hotel />
                </ListItemIcon>
                <ListItemText 
                  primary={`${accommodation.bedrooms} Bedrooms`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Bathtub />
                </ListItemIcon>
                <ListItemText 
                  primary={`${accommodation.bathrooms} Bathrooms`}
                />
              </ListItem>
            </List>
          </Paper>
        </Box>

        <Box width={300}>
          <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h5" gutterBottom>
              ${accommodation.price}
              <Typography component="span" color="text.secondary"> / night</Typography>
            </Typography>
            
            <BookingCalendar 
              onDateChange={handleDateChange}
              bookedDates={bookedDates}
            />

            {selectedStartDate && selectedEndDate && (
              <>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    {numberOfNights} nights
                  </Typography>
                  <Typography variant="h6">
                    Total: ${totalPrice}
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  size="large"
                >
                  Book Now
                </Button>
              </>
            )}

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>Amenities</Typography>
            <List>
              {accommodation.amenities?.map((amenity) => (
                <ListItem key={amenity}>
                  <ListItemIcon>
                    {amenityIcons[amenity] || <Hotel />}
                  </ListItemIcon>
                  <ListItemText primary={amenity} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default AccommodationDetail;
