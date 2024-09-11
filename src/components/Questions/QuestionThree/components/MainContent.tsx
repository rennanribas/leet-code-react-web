import React from 'react'
import { Box, Typography } from '@mui/material'

const MainContent: React.FC = () => {
  return (
    <Box
      sx={{
        flexBasis: '70%',
        backgroundColor: '#f6bf00',
        margin: 1,
        padding: 2,
        marginRight: 0,
      }}
    >
      <Typography variant='h4' align='center'>
        Main Content
      </Typography>
      <Typography variant='body1' align='center'>
        **If things do not look right, make sure your browser is in
        "Experimental Mode".
      </Typography>
    </Box>
  )
}

export default MainContent
