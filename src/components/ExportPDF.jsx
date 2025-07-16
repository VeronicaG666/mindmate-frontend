import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Button,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function ExportPDF({ entries }) {
  const recentEntries = [...entries]
    .sort((a, b) => b.id - a.id)
    .slice(0, 7);

  const exportToPDF = async () => {
    const input = document.getElementById('pdf-content');

    if (!input) {
      console.error("❌ PDF content block not found.");
      return;
    }

    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('MindMate_Journal.pdf');
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
  };

  return (
    <Box my={6} textAlign="center">
      <Button
        variant="contained"
        onClick={exportToPDF}
        startIcon={<PictureAsPdfIcon />}
        sx={{
          backgroundColor: '#FF90BB',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#FF6FAF'
          },
          px: 4,
          py: 1.5,
          borderRadius: '30px',
          fontWeight: 'bold',
          fontSize: '1rem',
          mb: 2
        }}
      >
        Download Your Journal as PDF
      </Button>

      <Paper
        id="pdf-content"
        sx={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          width: '600px',
          padding: 4,
          backgroundColor: '#fff7fa',
          borderRadius: 2
        }}
      >
        <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
          MindMate — Recent Journal Summary
        </Typography>

        {recentEntries.map((entry, i) => (
          <Box key={i} mb={3}>
            <Typography variant="subtitle2" fontWeight="bold">
              Entry #{recentEntries.length - i}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Mood:</strong> {entry.mood} | <strong>Confidence:</strong> {entry.confidence}
            </Typography>
            <Typography variant="body1" paragraph>{entry.text}</Typography>
            <hr style={{ borderTop: '1px dashed #ccc' }} />
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

export default ExportPDF;
