import React, { useState, useRef } from 'react'
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  TextField,
} from '@mui/material'

const isPowerOfTwo = (num: number): boolean => (num & (num - 1)) === 0

const runBackgroundProcess = (
  arr: string[],
  setDisplay: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
  stopRef: React.MutableRefObject<boolean>,
  setElapsed: React.Dispatch<React.SetStateAction<number>>
) => {
  let elapsedTime = 0
  setLoading(true)
  setElapsed(0)

  const intervalId = setInterval(() => {
    elapsedTime += 1
    setElapsed(elapsedTime)

    if (isPowerOfTwo(elapsedTime)) {
      const index = Math.log2(elapsedTime)
      if (index < arr.length) {
        setDisplay((prev) => `${prev} ${arr[index]}(${elapsedTime}s)`)
      }
    }

    if (stopRef.current || elapsedTime >= Math.pow(2, arr.length - 1)) {
      clearInterval(intervalId)
      setLoading(false)
      setIsRunning(false)
      return
    }
  }, 1000)
}

const QuestionTwo: React.FC = () => {
  const [display, setDisplay] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [elapsed, setElapsed] = useState<number>(0)
  const [inputValue, setInputValue] = useState<string>('')

  const stopRef = useRef<boolean>(false)

  const handleStartStop = () => {
    if (isRunning) {
      stopRef.current = true
      setIsRunning(false)
      setLoading(false)
    } else {
      stopRef.current = false
      setDisplay('')
      const items = inputValue.split(',').map((item) => item.trim())
      runBackgroundProcess(
        items,
        setDisplay,
        setLoading,
        setIsRunning,
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
