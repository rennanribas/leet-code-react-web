import React from 'react'
import { Box, Typography } from '@mui/material'

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '10vh',
        backgroundColor: '#ffa000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
      }}
    >
      <Typography variant='h4' color='white' align='center'>
        Footer
      </Typography>
    </Box>
  )
}

export default Footer
