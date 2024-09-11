import React from 'react'
import { Box, Typography } from '@mui/material'

const ExtraContent: React.FC = () => {
  return (
    <Box
      sx={{
        flexBasis: '30%',
        backgroundColor: '#898989',
        margin: 1,
        padding: 2,
        marginRight: 0,
      }}
    >
      <Typography variant='h4' align='center'>
        Extra Content
      </Typography>
    </Box>
  )
}

export default ExtraContent
