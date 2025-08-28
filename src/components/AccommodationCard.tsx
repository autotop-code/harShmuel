
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import type { Accommodation } from '../types/accommodation';

interface AccommodationCardProps {
  accommodation: Accommodation;
  onView: (id: number) => void;
}

const AccommodationCard = ({ accommodation, onView }: AccommodationCardProps) => {
  const { id, title, description, price, location, images } = accommodation;

  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
        '&:hover': {
          '& .MuiCardMedia-root': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      <Box sx={{ 
        position: 'relative', 
        overflow: 'hidden',
        borderRadius: '12px 12px 0 0',
      }}>
        <CardMedia
          component="img"
          height="240"
          image={images[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={title}
          sx={{
            transition: 'transform 0.3s ease-in-out',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
            padding: '40px 16px 16px',
          }}
        >
          <Typography variant="h6" component="h2" sx={{ color: 'white', fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
            {location}
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '3em' }}>
          {description.length > 120 ? `${description.substring(0, 120)}...` : description}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mt: 'auto',
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}>
          <Box>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
              ${price}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              per night
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => onView(id)}
            sx={{
              px: 3,
              py: 1,
              fontWeight: 500,
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AccommodationCard;