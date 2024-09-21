import React, { useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'
import MermaidChart from '../MermaidChart'

interface CarrotType {
  kg: number
  price: number
}

const getMaxValue = (
  carrotTypes: CarrotType[],
  capacity: number,
  setMermaidCode: (code: string) => void,
  setDpList: (
    list: Array<{ capacity: number; value: number; explanation: string }>
  ) => void
) => {
  const dp = Array(capacity + 1).fill(0)
  let code = 'graph TD\n'
  const dpList = []
  const carrotUsage = carrotTypes.map(() => Array(capacity + 1).fill(0))

  for (let i = 0; i <= capacity; i++) {
    if (i === 0) {
      dpList.push({
        capacity: i,
        value: dp[i],
        explanation: 'Base case: No carrots can be taken.',
      })
      continue
    }
    let explanation = ''
    let newGraphLine = ''
    for (let j = 0; j < carrotTypes.length; j++) {
      const carrot = carrotTypes[j]

      if (carrot.kg <= i) {
        const newValue = dp[i - carrot.kg] + carrot.price

        if (newValue > dp[i]) {
          explanation = `dp[${i - carrot.kg}](${dp[i - carrot.kg]}) + dp[${
            carrot.kg
          }](${dp[carrot.kg]}) 
            = ${newValue}`

          newGraphLine += `dp${i}[dp${i}=${dp[i - carrot.kg]} +${
            dp[carrot.kg]
          } = ${newValue}] --> dp${i - carrot.kg} --> dp${carrot.kg}\n`

          dp[i] = newValue
          carrotUsage[j][i] = carrotUsage[j][i - carrot.kg] + 1
          for (let k = 0; k < carrotTypes.length; k++) {
            if (k !== j) {
              carrotUsage[k][i] = carrotUsage[k][i - carrot.kg]
            }
          }
        }
      }
    }
    code += newGraphLine
    dpList.push({ capacity: i, value: dp[i], explanation })
  }

  setMermaidCode(code)
  setDpList(dpList)
  return dp[capacity]
}

const QuestionSeven: React.FC = () => {
  const [carrotTypesInput, setCarrotTypesInput] = useState<string>(
    '[{"kg": 5, "price": 100}, {"kg": 7, "price": 150}, {"kg": 2, "price": 70}]'
  )
  const [capacityInput, setCapacityInput] = useState<string>('7')
  const [maxValue, setMaxValue] = useState<number | null>(null)
  const [mermaidCode, setMermaidCode] = useState<string>('')
  const [dpList, setDpList] = useState<
    Array<{ capacity: number; value: number; explanation: string }>
  >([])

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

      const result = getMaxValue(
        carrotTypes,
        capacity,
        setMermaidCode,
        setDpList
      )
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
        label='Enter carrot types as JSON (default: [{"kg": 5, "price": 100}, {"kg": 7, "price": 150}, {"kg": 2, "price": 70}])'
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

      {dpList.length > 0 && (
        <Box
          sx={{
            marginY: 3,
            border: '1px solid grey',
            borderRadius: 2,
            display: 'flex',
            paddingX: 3,
            paddingY: 1,
            flexDirection: 'column',
          }}
        >
          <Typography variant='h6' color='black'>
            DP Table:
          </Typography>

          {dpList.map((item) => (
            <Typography variant='body1' key={item.capacity}>
              <strong>dp[{item.capacity}]</strong> = {item.capacity}kg,{' '}
              {item.value}{' '}
              <label style={{ color: '#00bcd4' }}>({item.explanation})</label>
            </Typography>
          ))}
        </Box>
      )}

      {mermaidCode && <MermaidChart chart={mermaidCode} />}
    </Box>
  )
}

export default QuestionSeven
