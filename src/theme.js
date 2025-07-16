import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF90BB', // rose pink
    },
    secondary: {
      main: '#8ACCD5', // soft aqua
    },
    background: {
      default: '#F8F8E1',     // vanilla cream
      paper: '#FFC1DA',       // light pink
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
  },

  typography: {
    fontFamily: `'Poppins', sans-serif`,
    h1: { fontSize: '3rem', fontWeight: 700 },
    h2: { fontSize: '2.4rem', fontWeight: 600 },
    h3: { fontSize: '2rem', fontWeight: 600 },
    h4: { fontSize: '1.6rem', fontWeight: 600 },
    h5: { fontSize: '1.3rem', fontWeight: 500 },
    body1: { fontSize: '1rem' },
    button: { fontSize: '1rem', fontWeight: 500 },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
          fontWeight: 'bold',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#FF6FAF', // deeper rose on hover
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#7BC0CE',
          },
        },
        outlinedSecondary: {
          '&:hover': {
            backgroundColor: '#E1F5F8',
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.08)',
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
        },
        elevation2: {
          boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)',
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '2rem',
          paddingBottom: '2rem',
        },
      },
    },
  },
});

export default theme;
