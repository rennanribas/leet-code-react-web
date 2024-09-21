import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import theme from './styles/theme' // Import the custom theme
import { ThemeProvider } from '@mui/material/styles'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
