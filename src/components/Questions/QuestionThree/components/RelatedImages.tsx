import React from 'react'
import { Box, Typography } from '@mui/material'

const RelatedImages: React.FC = () => {
  return (
    <Box
      sx={{
        flexBasis: '80%',
        backgroundColor: '#00ba6c',
        margin: 1,
        padding: 2,
        marginLeft: 0,
      }}
    >
      <Typography variant='h4' align='center'>
        Related Images
      </Typography>
    </Box>
  )
}

export default RelatedImages
