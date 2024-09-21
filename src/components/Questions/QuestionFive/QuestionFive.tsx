import React, { useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'
import MermaidChart from '../../MermaidChart'

const QuestionFive: React.FC = () => {
  const [floors, setFloors] = useState<number>(100)
  const [eggs, setEggs] = useState<number>(2)
  const [minDrops, setMinDrops] = useState<number | null>(null)
  const [mermaidCode, setMermaidCode] = useState<string>('')

  const eggDrop = (n: number, k: number): number => {
    const eggFloor = Array(n + 1)
      .fill(0)
      .map(() => Array(k + 1).fill(0))

    for (let i = 1; i <= n; i++) {
      eggFloor[i][0] = 0
      eggFloor[i][1] = 1
    }

    for (let j = 1; j <= k; j++) {
      eggFloor[1][j] = j
    }

    let code = 'graph LR\n'
    for (let i = 2; i <= n; i++) {
      for (let j = 2; j <= k; j++) {
        eggFloor[i][j] = Infinity
        for (let x = 1; x <= j; x++) {
          const res = 1 + Math.max(eggFloor[i - 1][x - 1], eggFloor[i][j - x])
          if (res < eggFloor[i][j]) {
            eggFloor[i][j] = res
          }
        }
        if (j - 2 < 4 || j > k - 4)
          code += `egg${i}floor${j}["${eggFloor[i][j]}"] --> 
            egg${i - 1}floor${j - 1}["${
            eggFloor[i - 1][j - 1]
          }"] --> floor${j}["Floor: ${j}"] --> eggfloor${j}["Eggs: ${i}"] \n`
        if (j - 2 === 4 && j <= k - 4) code += `egg${i}floor${j}["..."] \n`
      }
    }
    setMermaidCode(code)

    return eggFloor[n][k]
  }

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

export default QuestionFive
