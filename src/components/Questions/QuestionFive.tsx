import React, { useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'

const QuestionFive: React.FC = () => {
  const [floors, setFloors] = useState<number>(100)
  const [minDrops, setMinDrops] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFloors(Number(e.target.value))
  }

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

    for (let i = 2; i <= n; i++) {
      for (let j = 2; j <= k; j++) {
        eggFloor[i][j] = Infinity
        for (let x = 1; x <= j; x++) {
          const res = 1 + Math.max(eggFloor[i - 1][x - 1], eggFloor[i][j - x])
          if (res < eggFloor[i][j]) {
            eggFloor[i][j] = res
          }
        }
      }
    }
    return eggFloor[n][k]
  }

  const handleSubmit = () => {
    const result = eggDrop(2, floors)
    setMinDrops(result)
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 3,
        backgroundColor: '#f5f5f5',
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
        onChange={handleInputChange}
        sx={{ marginBottom: 2 }}
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
    </Box>
  )
}

export default QuestionFive
