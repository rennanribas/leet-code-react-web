import React from 'react'
import QuestionFive from './QuestionFive'
import Explanation from './Explanation'
import { Box, Paper, Typography } from '@mui/material'

const QuestionFiveIndex: React.FC = () => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 2, margin: 1, textAlign: 'center', alignSelf: 'center' }}
      >
        <Typography variant='h6' gutterBottom style={{ maxWidth: '1200px' }}>
          <strong>"</strong>A building has 100 floors. One of the floors is the
          highest floor an egg can be dropped from without breaking. <br />
          If an egg is dropped from above that floor, it will break. <br />
          If it is dropped from that floor or below, it will be completely
          undamaged and you can drop the egg again. <br />
          Given two eggs, find the highest floor an egg can be dropped from
          without breaking, with as few drops as possible in the worst-case
          scenario.<strong>"</strong>
        </Typography>
      </Paper>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <QuestionFive />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Explanation />
      </Box>
    </Box>
  )
}

export default QuestionFiveIndex
