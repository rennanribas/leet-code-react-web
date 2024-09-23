import React, { useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'
import MermaidChart from '../../MermaidChart'

const QuestionFive: React.FC = () => {
  const [floors, setFloors] = useState<number>(10) // Reduced for easier visualization
  const [eggs, setEggs] = useState<number>(2)
  const [minDrops, setMinDrops] = useState<number | null>(null)
  const [mermaidCode, setMermaidCode] = useState<string>('')
  const [dpArray, setDpArray] = useState<number[][]>([])

  const eggDrop = (n: number, k: number): number[][] => {
    // Initialize DP table with base cases
    const eggFloor = Array(n + 1)
      .fill(0)
      .map(() => Array(k + 1).fill(0))
    let code = 'graph TD\n'

    // Base cases
    for (let i = 1; i <= n; i++) {
      eggFloor[i][0] = 0
      eggFloor[i][1] = 1
    }

    for (let j = 1; j <= k; j++) {
      eggFloor[1][j] = j
    }

    // DP computation
    for (let i = 2; i <= n; i++) {
      for (let j = 2; j <= k; j++) {
        eggFloor[i][j] = Infinity
        let comparisonChoosed = ''
        for (let x = 1; x <= j; x++) {
          const broken = eggFloor[i - 1][x - 1] // Egg breaks
          const notBroken = eggFloor[i][j - x] // Egg doesn't break
          const res = 1 + Math.max(broken, notBroken)
          if (res < eggFloor[i][j]) {
            eggFloor[i][j] = res
            // Build the mermaid code to show the dependency and reasoning
            if (broken >= notBroken) {
              comparisonChoosed = `dp${i}_${j}["dp[${i}][${j}] = 1 + dp[${
                i - 1
              }][${x - 1}] = ${res}"]\n`
              comparisonChoosed += `dp${i}_${j} --> dp${i - 1}_${x - 1}["dp[${
                i - 1
              }][${x - 1}] = ${broken}"]\n`
            } else {
              comparisonChoosed = `dp${i}_${j}["dp[${i}][${j}] = 1 + dp[${i}][${
                j - x
              }] = ${res}"]\n`
              comparisonChoosed += `dp${i}_${j} --> dp${i}_${j - x}["dp[${i}][${
                j - x
              }] = ${notBroken}"]\n`
            }
          }
        }
        code += comparisonChoosed
      }
    }

    setMermaidCode(code)
    return eggFloor
  }

  const handleSubmit = () => {
    const result = eggDrop(eggs, floors)
    setDpArray(result)
    setMinDrops(result[eggs][floors])
  }

  return (
    <Box
      sx={{
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
        label='Enter number of floors (e.g., 10)'
        value={floors}
        onChange={(e) => setFloors(Number(e.target.value))}
        sx={{ marginBottom: 2, width: '50%' }}
      />

      <TextField
        fullWidth
        variant='outlined'
        label='Enter number of eggs (e.g., 2)'
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

      {dpArray.length > 0 && (
        <Box
          sx={{
            marginY: 3,
            border: '1px solid grey',
            borderRadius: 2,
            display: 'flex',
            paddingX: 3,
            paddingY: 1,
            flexDirection: 'column',
            textAlign: 'left',
            overflowX: 'auto',
          }}
        >
          <Typography variant='h6' color='black'>
            DP Table:
          </Typography>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>
                  Eggs/Floors
                </th>
                {Array.from({ length: floors + 1 }, (_, i) => (
                  <th
                    key={i}
                    style={{ border: '1px solid black', padding: '8px' }}
                  >
                    {i}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dpArray.map((row, i) => (
                <tr key={i}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {i}
                  </td>
                  {row.map((col, j) => (
                    <td
                      key={j}
                      style={{ border: '1px solid black', padding: '8px' }}
                    >
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Box />
        </Box>
      )}

      {mermaidCode && <MermaidChart chart={mermaidCode} />}
    </Box>
  )
}

export default QuestionFive
