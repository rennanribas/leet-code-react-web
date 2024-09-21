import React, { useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'
import MermaidChart from '../../MermaidChart'

const QuestionFiveSimplified: React.FC = () => {
  const [floors, setFloors] = useState<number>(100) // State for number of floors
  const [eggs, setEggs] = useState<number>(2) // State for number of eggs
  const [minDrops, setMinDrops] = useState<number | null>(null) // State to store minimum drops result
  const [mermaidCode, setMermaidCode] = useState<string>('') // State to store Mermaid code for visualization

  // Function to calculate the minimum number of drops needed in the worst case
  const eggDrop = (eggs: number, floors: number): number => {
    // Initialize a 2D array with zeros
    const eggFloor = Array(eggs + 1)
      .fill(0)
      .map(() => Array(floors + 1).fill(0))

    // Base cases: if we have 1 egg, the number of drops equals the number of floors
    for (let j = 1; j <= floors; j++) {
      eggFloor[1][j] = j
    }

    // Base cases: for any number of eggs, 0 floors need 0 drops, and 1 floor needs 1 drop
    for (let i = 1; i <= eggs; i++) {
      eggFloor[i][0] = 0
      eggFloor[i][1] = 1
    }

    // Fill the DP table using dynamic programming
    for (let i = 2; i <= eggs; i++) {
      // Iterate over each number of eggs
      for (let j = 2; j <= floors; j++) {
        // Iterate over each number of floors
        eggFloor[i][j] = floors // Initialize with the maximum possible value

        // Try dropping the egg from each floor and calculate the minimum number of drops
        for (let x = 1; x <= j; x++) {
          const breakCase = eggFloor[i - 1][x - 1] // Case where the egg breaks
          const noBreakCase = eggFloor[i][j - x] // Case where the egg does not break
          const drops = 1 + (breakCase > noBreakCase ? breakCase : noBreakCase) // Choose the worst case

          // Update the DP table with the minimum number of drops
          if (drops < eggFloor[i][j]) {
            eggFloor[i][j] = drops
          }
        }
      }
    }

    // Generate Mermaid code for visualization
    let code = 'graph LR\n'
    for (let i = 2; i <= eggs; i++) {
      for (let j = 2; j <= floors; j++) {
        eggFloor[i][j] = Math.min(eggFloor[i][j], floors)
        code += `egg${i}floor${j}["${eggFloor[i][j]}"] --> 
          egg${i - 1}floor${j - 1}["${eggFloor[i - 1][j - 1]}"]\n`
        code += `egg${i}floor${j} --> egg${i}floor${j - 1}["${
          eggFloor[i][j - 1]
        }"]\n`
      }
    }
    setMermaidCode(code)

    // Return the minimum number of drops needed in the worst case
    return eggFloor[eggs][floors]
  }

  // Handle form submission and calculate the minimum number of drops
  const handleSubmit = () => {
    const result = eggDrop(eggs, floors)
    setMinDrops(result)
  }

  return (
    <Box
      sx={{
        flexBasis: '50%',
        margin: 1,
        padding: 3,
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h6' gutterBottom color='black'>
        Question 5: Egg Drop Problem
      </Typography>
      <TextField
        fullWidth
        variant='outlined'
        label='Enter number of floors (default is 100)'
        value={floors}
        onChange={(e) => setFloors(Number(e.target.value))}
        sx={{ marginBottom: 2, width: '50%' }}
      />

      <TextField
        fullWidth
        variant='outlined'
        label='Enter number of eggs (default is 2)'
        value={eggs}
        onChange={(e) => setEggs(Number(e.target.value))}
        sx={{ marginBottom: 2, width: '50%' }}
      />
      <Button variant='contained' color='primary' onClick={handleSubmit}>
        Calculate Minimum Drops
      </Button>

      {minDrops !== null && (
        <Box
          sx={{
            marginTop: 3,
            border: '1px solid grey',
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'center',
            padding: 1,
          }}
        >
          <Typography variant='h6' color='primary'>
            Minimum number of drops in worst case: {minDrops}
          </Typography>
        </Box>
      )}

      {mermaidCode && <MermaidChart chart={mermaidCode} />}
    </Box>
  )
}

export default QuestionFiveSimplified
