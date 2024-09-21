import React from 'react'
import { Box, Typography } from '@mui/material'

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        flexBasis: '60%',
        backgroundColor: '#ffa000',
        margin: 1,
        padding: 2,
        marginLeft: 0,
      }}
    >
      <Typography variant='h4' align='center'>
        Sidebar
      </Typography>
    </Box>
  )
}

export default Sidebar
