import React, { useState, useEffect, useRef } from 'react'
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  TextField,
} from '@mui/material'

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

const printItemsWithExponentialDelay = async (
  arr: string[],
  setDisplay: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  stopRef: React.MutableRefObject<boolean>,
  setElapsed: React.Dispatch<React.SetStateAction<number>>
) => {
  setLoading(true)
  setElapsed(0)

  for (let i = 0; i < arr.length; i++) {
    if (stopRef.current) break
    const delayTime = Math.pow(2, i) * 1000
    await delay(delayTime)
    if (stopRef.current) break
    setDisplay((prev) => prev + arr[i] + ' ')
  }

  setLoading(false)
}

const QuestionTwo: React.FC = () => {
  const [display, setDisplay] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [elapsed, setElapsed] = useState<number>(0)
  const [inputValue, setInputValue] = useState<string>('')

  const stopRef = useRef<boolean>(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (loading) {
      timer = setInterval(() => {
        setElapsed((prev) => prev + 1)
      }, 1000)
    } else setIsRunning(false)
    return () => clearInterval(timer)
  }, [loading])

  const handleStartStop = () => {
    if (isRunning) {
      stopRef.current = true
      setIsRunning(false)
      setLoading(false)
    } else {
      stopRef.current = false
      setDisplay('')
      const items = inputValue.split(',').map((item) => item.trim())
      printItemsWithExponentialDelay(
        items,
        setDisplay,
        setLoading,
        stopRef,
        setElapsed
      )
      setIsRunning(true)
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
      <Typography variant='h6'>
        Question 2: Print Items with Exponential Delay
      </Typography>

      <TextField
        label='Enter array items (comma separated)'
        placeholder='a,b,c,d'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
        sx={{ marginTop: 2 }}
      />

      <Button
        disabled={!loading && !inputValue}
        variant='contained'
        color={isRunning ? 'secondary' : 'primary'}
        onClick={handleStartStop}
        sx={{ marginTop: 2 }}
      >
        {isRunning ? 'Stop' : 'Start Printing'}
      </Button>

      {(display || loading) && (
        <Box
          sx={{
            marginTop: 3,
            textAlign: 'center',
            border: '1px solid grey',
            borderRadius: 2,
          }}
        >
          {isRunning && (
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
              <CircularProgress size={24} sx={{ margin: 2 }} />
              <Typography variant='body1'>Printing in progress...</Typography>
            </Box>
          )}

          <Typography variant='body2' sx={{ margin: 2 }}>
            Time elapsed: {elapsed} seconds
          </Typography>
          <Typography variant='body1' sx={{ margin: 2 }}>
            Output: {display}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default QuestionTwo
