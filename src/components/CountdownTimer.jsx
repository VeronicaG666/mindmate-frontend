import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs from 'dayjs';

function CountdownTimer() {
  const [appointment, setAppointment] = useState(null);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    if (!appointment) return;

    const interval = setInterval(() => {
      const now = dayjs();
      const duration = dayjs(appointment).diff(now);

      if (duration <= 0) {
        setCountdown('Appointment time!');
        clearInterval(interval);
        return;
      }

      const hrs = Math.floor(duration / (1000 * 60 * 60));
      const mins = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((duration % (1000 * 60)) / 1000);

      setCountdown(`${hrs}h ${mins}m ${secs}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [appointment]);

  return (
    <Box
      sx={{
        bgcolor: '#ffc1da',
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <AccessTimeIcon color="action" />
        <Typography variant="h6" fontWeight="medium">
          Next Therapy Session
        </Typography>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Select date & time"
          value={appointment}
          onChange={(newValue) => setAppointment(newValue)}
          disablePast
          ampm
          textField={(params) => <TextField {...params} />}
          slotProps={{ textField: { fullWidth: true, InputProps: { readOnly: true } } }}
        />
      </LocalizationProvider>
      {appointment && (
        <Typography mt={1} fontSize="0.9rem" width="100%">
          ⏳ Countdown: {countdown}
        </Typography>
      )}
    </Box>
  );
}

export default CountdownTimer;
