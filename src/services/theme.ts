import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2193b0',
        },
        secondary: {
            main: '#d3d3d3',
        },
        background: {
            default: '#f5f5f5',
        },
        text: {
            primary: '#333333',
            secondary: '#555555',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h1: {
            color: '#2193b0',
        },
        h2: {
            color: '#2193b0',
        },
        h3: {
            color: '#2193b0',
        },
        h4: {
            color: '#2193b0',
        },
        h5: {
            color: '#2193b0',
        },
        h6: {
            color: '#2193b0',
        },
    },
});

export default theme;
