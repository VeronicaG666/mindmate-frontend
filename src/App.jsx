import { useState, useEffect } from 'react';
import {
  Container, Box, Typography, TextField, Button, Paper,
  Grid, Card, CardContent, Link
} from '@mui/material';

import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import LaunchIcon from '@mui/icons-material/Launch';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import MoodChart from './components/MoodChart';
import CountdownTimer from './components/CountdownTimer';
import EmergencyHelp from './components/EmergencyHelp';
import JournalHistory from './components/JournalHistory';
import ExportPDF from './components/ExportPDF';

function App() {
  const [journalText, setJournalText] = useState('');
  const [result, setResult] = useState(null);
  const [resources, setResources] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [showEmergency, setShowEmergency] = useState(false);

  const fetchJournalHistory = async () => {
    const sessionStart = localStorage.getItem("sessionStart");

    try {
      const res = await fetch('https://mindmate-backend-2whm.onrender.com/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionStart })
      });

      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setJournalEntries(data);
        setChartData(data);
      } else {
        const fallbackRes = await fetch('https://mindmate-backend-2whm.onrender.com/api/journals');
        const fallbackData = await fallbackRes.json();
        setJournalEntries(fallbackData);
        setChartData(fallbackData);
      }
    } catch (err) {
      console.error("History fetch failed:", err);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("sessionStart")) {
      localStorage.setItem("sessionStart", Date.now().toString());
    }
    fetchJournalHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('https://mindmate-backend-2whm.onrender.com/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: journalText }),
    });

    const data = await res.json();
    setResult(data);

    const recRes = await fetch('https://mindmate-backend-2whm.onrender.com/api/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood: data.mood }),
    });

    const recData = await recRes.json();
    setResources(recData.resources);

    await fetchJournalHistory();
    setJournalText('');
  };

  return (
    <>
      <CountdownTimer />

      <Container maxWidth="md" sx={{ mt: 6, mb: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          MindMate
        </Typography>

        {/* Journal Entry Form */}
        <Paper elevation={3} sx={{ p: 4, mb: 6, backgroundColor: 'background.paper' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Write your thoughts here..."
              multiline
              fullWidth
              required
              rows={4}
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Analyze Mood
            </Button>
          </form>

          <Box mt={3} textAlign="center">
            <Button
              variant="contained"
              color="error"
              onClick={() => setShowEmergency(true)}
            >
              Emergency Help
            </Button>
          </Box>
        </Paper>

        {showEmergency && <EmergencyHelp onClose={() => setShowEmergency(false)} />}

        {/* Mood Result */}
        {result && (
          <Box mt={6}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <PsychologyIcon color="secondary" />
              <Typography variant="h5" gutterBottom>
                Detected Mood: <span style={{ textTransform: 'capitalize' }}>{result.mood}</span>
              </Typography>
            </Box>
            <Typography variant="body1" gutterBottom ml={4}>
              Confidence: {result.confidence}
            </Typography>
          </Box>
        )}

        {/* Recommendations */}
        {resources.length > 0 && (
          <Box mt={6}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <AutoAwesomeIcon color="secondary" />
              <Typography variant="h5" gutterBottom>
                Curated Resources Just for You
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {resources.map((r, idx) => (
                <Grid key={idx} sx={{ flexBasis: { xs: '100%', sm: '50%' } }}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: '100%',
                      borderLeft: '6px solid #FF90BB',
                      backgroundColor: '#fff0f5',
                      transition: '0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: 3,
                      },
                    }}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <EmojiObjectsIcon color="primary" />
                        <Typography fontWeight="bold">{r.title}</Typography>
                      </Box>
                      <Link
                        href={r.url}
                        target="_blank"
                        rel="noopener"
                        underline="hover"
                        color="primary"
                        display="inline-flex"
                        alignItems="center"
                        gap={0.5}
                      >
                        Open Resource <LaunchIcon fontSize="small" />
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Mood Charts */}
        <Paper elevation={3} sx={{ p: 4, mt: 6, mb: 5, backgroundColor: '#fff7fa', borderRadius: 3 }}>
          <MoodChart data={chartData} />
        </Paper>

        {/* PDF Export */}
        <Paper elevation={3} sx={{ p: 4, mb: 6, backgroundColor: '#fff7fa', borderRadius: 3 }}>
          <ExportPDF entries={journalEntries} />
        </Paper>

        {/* History Log */}
        <Box mt={6}>
          <JournalHistory />
        </Box>
      </Container>
    </>
  );
}

export default App;
