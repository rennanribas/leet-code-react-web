import React from 'react'
import { Box, Typography } from '@mui/material'

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        flexBasis: '40%',
        backgroundColor: '#dac8e5',
        margin: 1,
        padding: 2,
        marginLeft: 0,
      }}
    >
      <Typography variant='h4' align='center'>
        Hero
      </Typography>
    </Box>
  )
}

export default Hero
