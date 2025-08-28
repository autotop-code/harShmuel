import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import type { RangeKeyDict } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Paper, Typography, Box } from '@mui/material';

interface BookingCalendarProps {
  onDateChange: (startDate: Date, endDate: Date) => void;
  bookedDates?: Array<{ startDate: Date; endDate: Date }>;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onDateChange, bookedDates = [] }) => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  // Convert booked dates to disabled dates array
  const disabledDates = bookedDates.flatMap(range => {
    const dates: Date[] = [];
    let currentDate = new Date(range.startDate);
    const endDate = new Date(range.endDate);
    
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  });

  const handleSelect = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    if (selection && selection.startDate && selection.endDate) {
      setDateRange([{
        startDate: selection.startDate,
        endDate: selection.endDate,
        key: 'selection'
      }]);
      onDateChange(selection.startDate, selection.endDate);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Check Availability
      </Typography>
      <Box sx={{ 
        '& .rdrCalendarWrapper': { 
          width: '100%',
          maxWidth: '100%',
          fontSize: '16px'
        },
        '& .rdrMonth': { 
          width: '100%'
        }
      }}>
        <DateRange
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          minDate={new Date()}
          disabledDates={disabledDates}
          rangeColors={['#1976d2']}
          months={1}
          direction="vertical"
          showDateDisplay={true}
        />
      </Box>
    </Paper>
  );
};

export default BookingCalendar;
