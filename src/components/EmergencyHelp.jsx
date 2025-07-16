import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import PhoneIcon from '@mui/icons-material/Phone';
import GroupIcon from '@mui/icons-material/Group';
import CallIcon from '@mui/icons-material/Call';

function EmergencyHelp({ onClose }) {
  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          bgcolor: 'error.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <ReportProblemRoundedIcon sx={{ fontSize: 26 }} />
        Emergency Help
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          If you’re feeling overwhelmed or unsafe, please take immediate action.
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              <PhoneIcon color="error" sx={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText
              primary="Call Emergency Services"
              secondary={
                <Typography component="a" href="tel:112" sx={{ color: 'primary.main' }}>
                  Dial 112
                </Typography>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <GroupIcon color="warning" sx={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText
              primary="Talk to a Friend"
              secondary="Reach out to someone you trust. Just one call can help."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CallIcon color="primary" sx={{ fontSize: 24 }} />
            </ListItemIcon>
            <ListItemText
              primary="Mental Health Helpline (India)"
              secondary={
                <Typography component="a" href="tel:9152987821" sx={{ color: 'primary.main' }}>
                  Dial 9152987821
                </Typography>
              }
            />
          </ListItem>
        </List>

        <Typography variant="body2" mt={2} color="text.secondary">
          This app is a support tool — not a replacement for medical help. Please prioritize your safety.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EmergencyHelp;
