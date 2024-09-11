import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#00bcd4',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    body1: {
      fontSize: '16px',
      lineHeight: '1.6em',
    },
  },
})

export default theme
