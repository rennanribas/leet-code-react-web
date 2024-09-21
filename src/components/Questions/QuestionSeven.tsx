import React, { useState } from 'react'
import { TextField, Button, Typography, Box, Paper } from '@mui/material'
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
  const [capacityInput, setCapacityInput] = useState<string>('36')
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
    <Box>
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

      <Box
        sx={{
          display: 'flex',
          width: '95vw',
          margin: 2,
          padding: 3,
          backgroundColor: '#f5f5f5',
          textAlign: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant='h6' gutterBottom color='black'>
          Question 7: Maximum Carrot Value in a Bag
        </Typography>

        <TextField
          fullWidth
          variant='outlined'
          label='Enter carrot types as JSON '
          value={carrotTypesInput}
          onChange={handleCarrotTypesChange}
          sx={{
            width: '50%',
            marginY: 2,
          }}
        />

        <TextField
          fullWidth
          variant='outlined'
          label='Enter bag capacity (kg)'
          value={capacityInput}
          onChange={handleCapacityChange}
          sx={{
            width: '50%',
            marginBottom: 2,
          }}
        />

        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          style={{ width: '30%' }}
        >
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
              padding: 2,
              width: 'max-content',
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
              textAlign: 'left',
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
    </Box>
  )
}

export default QuestionSeven
