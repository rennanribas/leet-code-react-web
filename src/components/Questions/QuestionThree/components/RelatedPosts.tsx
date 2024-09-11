import React from 'react'
import { Box, Typography } from '@mui/material'

const RelatedPosts: React.FC = () => {
  return (
    <Box
      sx={{
        flexBasis: '20%',
        backgroundColor: '#e5b5c9',
        margin: 1,
        padding: 2,
        marginRight: 0,
      }}
    >
      <Typography variant='h4' align='center'>
        Related Posts
      </Typography>
    </Box>
  )
}

export default RelatedPosts
