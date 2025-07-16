import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  CircularProgress
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const moodColor = {
  positive: 'success',
  neutral: 'warning',
  negative: 'error'
};

function JournalHistory() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    const res = await fetch('https://mindmate-backend-2whm.onrender.com/api/journals');
    const data = await res.json();
    setEntries(data.reverse());
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  if (loading) {
    return (
      <Box mt={6} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box mt={6}>
      <Typography variant="h5" gutterBottom display="flex" alignItems="center" gap={1}>
        <MenuBookIcon color="secondary" />
        Journal Entry History
      </Typography>

      <Timeline position="alternate">
        {entries.map((entry, index) => (
          <TimelineItem key={entry.id}>
            <TimelineOppositeContent color="text.secondary">
              Entry #{entries.length - index}
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot color={moodColor[entry.mood]} />
              {index !== entries.length - 1 && <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent>
              <Paper elevation={3} sx={{ p: 2, bgcolor: 'background.paper' }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
                  Mood: {entry.mood} ({entry.confidence})
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {entry.text.length > 200
                    ? entry.text.slice(0, 200) + '...'
                    : entry.text}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}

export default JournalHistory;
