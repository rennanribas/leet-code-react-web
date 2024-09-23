import React, { useState } from 'react'
import { TextField, Button, Typography, Box, Paper } from '@mui/material'
import MermaidChart from '../MermaidChart'

interface CarrotType {
  weight: number
  price: number
}

interface DpStep {
  capacity: number
  value: number
  explanation: string
}

class CarrotBagSolver {
  private carrotTypes: CarrotType[]
  private capacity: number
  private dpArray: number[]
  private dpSteps: DpStep[]
  private mermaidCode: string

  constructor(carrotTypes: CarrotType[], capacity: number) {
    this.carrotTypes = carrotTypes
    this.capacity = capacity
    this.dpArray = []
    this.dpSteps = []
    this.mermaidCode = 'graph LR\n'
  }

  public solve(): number {
    const dp = Array(this.capacity + 1).fill(0)
    const carrotUsage = this.carrotTypes.map(() =>
      Array(this.capacity + 1).fill(0)
    )

    for (
      let currentCapacity = 0;
      currentCapacity <= this.capacity;
      currentCapacity++
    ) {
      if (currentCapacity === 0) {
        this.dpSteps.push({
          capacity: currentCapacity,
          value: dp[currentCapacity],
          explanation: 'Base case: No carrots can be taken.',
        })
        continue
      }
      let stepExplanation = ''
      let mermaidNewGraphLine = ''
      for (
        let carrotTypeIndex = 0;
        carrotTypeIndex < this.carrotTypes.length;
        carrotTypeIndex++
      ) {
        const carrot = this.carrotTypes[carrotTypeIndex]

        if (carrot.weight <= currentCapacity) {
          const newValue = dp[currentCapacity - carrot.weight] + carrot.price

          if (newValue > dp[currentCapacity]) {
            stepExplanation = `dp[${currentCapacity - carrot.weight}](${
              dp[currentCapacity - carrot.weight]
            }) + price(${carrot.price}) = ${newValue}`

            mermaidNewGraphLine += `dp${currentCapacity}[dp${currentCapacity}=${
              dp[currentCapacity - carrot.weight]
            } + ${carrot.price} = ${newValue}] --> dp${
              currentCapacity - carrot.weight
            }\n`

            dp[currentCapacity] = newValue
            carrotUsage[carrotTypeIndex][currentCapacity] =
              carrotUsage[carrotTypeIndex][currentCapacity - carrot.weight] + 1
            for (let k = 0; k < this.carrotTypes.length; k++) {
              if (k !== carrotTypeIndex) {
                carrotUsage[k][currentCapacity] =
                  carrotUsage[k][currentCapacity - carrot.weight]
              }
            }
          }
        }
      }
      this.mermaidCode += mermaidNewGraphLine
      this.dpSteps.push({
        capacity: currentCapacity,
        value: dp[currentCapacity],
        explanation: stepExplanation,
      })
    }

    this.dpArray = dp
    return dp[this.capacity]
  }

  public getDpArray(): number[] {
    return this.dpArray
  }

  public getDpSteps(): DpStep[] {
    return this.dpSteps
  }

  public getMermaidCode(): string {
    return this.mermaidCode
  }
}

const parseCarrotTypes = (input: string): CarrotType[] => {
  const carrotTypes = JSON.parse(input)
  if (!Array.isArray(carrotTypes)) {
    throw new Error('Invalid input: carrot types should be an array.')
  }
  return carrotTypes.map((carrot) => {
    if (typeof carrot.kg !== 'number' || typeof carrot.price !== 'number') {
      throw new Error(
        'Invalid input: each carrot type must have a kg and price as numbers.'
      )
    }
    return { weight: carrot.kg, price: carrot.price }
  })
}

const DpSteps: React.FC<{ dpSteps: DpStep[] }> = ({ dpSteps }) => (
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
      Steps:
    </Typography>

    {dpSteps.map((item) => (
      <Typography variant='body1' key={item.capacity}>
        <strong>dp[{item.capacity}]</strong> = {item.value}{' '}
        <label style={{ color: '#00bcd4' }}>({item.explanation})</label>
      </Typography>
    ))}
  </Box>
)

const DpTable: React.FC<{ dpArray: number[] }> = ({ dpArray }) => (
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
      width: '69%',
    }}
  >
    <Typography variant='h6' color='black'>
      DP Table:
    </Typography>
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <tbody>
        <tr key={0}>
          <td style={{ border: '1px solid black', padding: '8px' }}>
            Capacity
          </td>
          {dpArray.map((_, i) => (
            <td
              key={`cap-${i}`}
              style={{ border: '1px solid black', padding: '8px' }}
            >
              {i}
            </td>
          ))}
        </tr>
        <tr key={1}>
          <td style={{ border: '1px solid black', padding: '8px' }}>
            Max Value
          </td>

          {dpArray.map((value, i) => (
            <td
              key={`val-${i}`}
              style={{ border: '1px solid black', padding: '8px' }}
            >
              {value}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
    <Box />
  </Box>
)

const QuestionSeven: React.FC = () => {
  const [carrotTypesInput, setCarrotTypesInput] = useState<string>(
    '[{"kg": 5, "price": 100}, {"kg": 7, "price": 150}, {"kg": 2, "price": 70}]'
  )
  const [capacityInput, setCapacityInput] = useState<string>('36')
  const [maxValue, setMaxValue] = useState<number | null>(null)
  const [mermaidCode, setMermaidCode] = useState<string>('')
  const [dpList, setDpList] = useState<DpStep[]>([])
  const [dpArray, setDpArray] = useState<number[]>([])

  const handleCarrotTypesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarrotTypesInput(e.target.value)
  }

  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCapacityInput(e.target.value)
  }

  const handleSubmit = () => {
    try {
      const carrotTypes = parseCarrotTypes(carrotTypesInput)
      const capacity = parseInt(capacityInput, 10)

      if (isNaN(capacity)) {
        throw new Error('Invalid capacity: must be a number.')
      }

      const solver = new CarrotBagSolver(carrotTypes, capacity)
      const result = solver.solve()
      setMaxValue(result)
      setDpArray(solver.getDpArray())
      setDpList(solver.getDpSteps())
      setMermaidCode(solver.getMermaidCode())
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{ padding: 2, margin: 1, textAlign: 'center', alignSelf: 'center' }}
      >
        <Typography variant='h6' gutterBottom style={{ maxWidth: '1200px' }}>
          <strong>"</strong>Think that you have an unlimited number of carrots,
          but a limited number of carrot types. Also, you have one bag that can
          hold a limited weight. Each type of carrot has a weight and a price.
          Write a function that takes carrotTypes and capacity and return the
          maximum value the bag can hold.<strong>"</strong>
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
              marginTop: 3,
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <DpSteps dpSteps={dpList} />
            {dpArray.length > 0 && <DpTable dpArray={dpArray} />}
          </Box>
        )}

        {mermaidCode && <MermaidChart chart={mermaidCode} />}
      </Box>
    </Box>
  )
}

export default QuestionSeven
