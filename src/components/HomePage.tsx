import React from 'react'
import { Box, Typography, Link, Divider } from '@mui/material'

const HomePage: React.FC = () => {
  return (
    <Box sx={{ padding: 3, textAlign: 'justify' }}>
      <Typography variant='h4' gutterBottom>
        Metrobi Challenge App
      </Typography>
      <Typography variant='body1' sx={{ marginBottom: 1 }}>
        This application is a solution to the technical challenge presented by
        Metrobi for a senior position. <br />
      </Typography>
      <Divider />
      <Typography variant='h5' gutterBottom sx={{ marginTop: 2 }}>
        Questions and Solutions (Resumed)
      </Typography>
      <Typography variant='body1'>
        <strong>1. Duplicate Items in an Array:</strong> Finds and returns
        duplicate items in an array using a Set to track seen elements.
      </Typography>
      <Typography variant='body1'>
        <strong>2. Print Array Items with Increasing Delays:</strong> Prints
        array items with exponentially increasing delays using setTimeout and
        async/await.
      </Typography>
      <Typography variant='body1'>
        <strong>3. React Flexbox Layout:</strong> Creates a specific layout
        using React and MUI's Box component with flexbox properties.
      </Typography>
      <Typography variant='body1'>
        <strong>4. Proper Bracket Matching:</strong> Checks if a string of
        brackets is properly opened and closed using a stack data structure.
      </Typography>
      <Typography variant='body1'>
        <strong>5. Egg Drop Problem:</strong> Solves the classic egg drop
        problem using dynamic programming to find the minimum number of drops
        needed in the worst-case scenario.
      </Typography>
      <Typography variant='body1'>
        <strong>6. Zeno's Paradox Animation:</strong> Animates Zeno's Paradox of
        Achilles and the Tortoise using React state and CSS animations to
        visually demonstrate the paradox.
      </Typography>
      <Typography variant='body1' sx={{ marginBottom: 3 }}>
        <strong>7. Maximum Value of Carrot Types:</strong> Calculates the
        maximum value a bag can hold given different carrot types with varying
        weights and prices, using dynamic programming.
      </Typography>
      <Divider style={{ marginBottom: 5 }} />
      <Link
        href='https://github.com/rennanribas/metrobi-challenge-app'
        target='_blank'
        rel='noopener'
      >
        Source Code in GitHub Repository
      </Link>
    </Box>
  )
}

export default HomePage
