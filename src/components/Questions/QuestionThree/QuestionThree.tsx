import React from 'react'
import { Box } from '@mui/material'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import MainContent from './components/MainContent'
import ExtraContent from './components/ExtraContent'
import RelatedImages from './components/RelatedImages'
import RelatedPosts from './components/RelatedPosts'

const QuestionThree: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexBasis: '80%',
          flexDirection: 'row',
          color: 'white',
        }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'column', flexBasis: '40%' }}
        >
          <Hero />
          <Sidebar />
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', flexBasis: '60%' }}
        >
          <MainContent />
          <ExtraContent />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexBasis: '20%',
          color: 'white',
        }}
      >
        <RelatedImages />
        <RelatedPosts />
      </Box>
    </>
  )
}

export default QuestionThree
