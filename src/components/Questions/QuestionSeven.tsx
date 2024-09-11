import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  Box,
} from '@mui/material'

interface CarrotType {
  kg: number
  price: number
}

const getMaxValue = (carrotTypes: CarrotType[], capacity: number) => {
  // Create a DP array to store maximum values for each capacity
  const dp = Array(capacity + 1).fill(0)

  for (let i = 0; i <= capacity; i++) {
    for (const carrot of carrotTypes) {
      if (carrot.kg <= i) {
        dp[i] = Math.max(dp[i], dp[i - carrot.kg] + carrot.price)
      }
    }
  }

  return dp[capacity]
}

const QuestionSeven: React.FC = () => {
  const [carrotTypesInput, setCarrotTypesInput] = useState<string>('')
  const [capacityInput, setCapacityInput] = useState<string>('')
  const [maxValue, setMaxValue] = useState<number | null>(null)

  const handleCarrotTypesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarrotTypesInput(e.target.value)
  }

  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCapacityInput(e.target.value)
  }

  const handleSubmit = () => {
    try {
      const carrotTypes: CarrotType[] = JSON.parse(carrotTypesInput)
      const capacity = parseInt(capacityInput, 10)

      if (!Array.isArray(carrotTypes) || isNaN(capacity)) {
        throw new Error('Invalid input')
      }

      const result = getMaxValue(carrotTypes, capacity)
      setMaxValue(result)
    } catch (error) {
      alert('Please enter valid carrot types and capacity.')
    }
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
        Question 7: Maximum Carrot Value in a Bag
      </Typography>

      <TextField
        fullWidth
        variant='outlined'
        label='Enter carrot types as JSON (e.g. [{"kg": 5, "price": 100}, {"kg": 7, "price": 150}])'
        value={carrotTypesInput}
        onChange={handleCarrotTypesChange}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        fullWidth
        variant='outlined'
        label='Enter bag capacity (kg)'
        value={capacityInput}
        onChange={handleCapacityChange}
        sx={{ marginBottom: 2 }}
      />

      <Button variant='contained' color='primary' onClick={handleSubmit}>
        Calculate Maximum Value
      </Button>

      {maxValue !== null && (
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
            Maximum Value the Bag Can Hold: {maxValue}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default QuestionSeven
