import React, { useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'

const QuestionFour: React.FC = () => {
  const [inputString, setInputString] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValid(null)
    setInputString(e.target.value)
  }

  const validateBrackets = (str: string): boolean => {
    const stack: string[] = []
    const bracketMap: { [key: string]: string } = {
      '(': ')',
      '{': '}',
      '[': ']',
    }

    for (let char of str) {
      if (bracketMap[char]) {
        stack.push(char)
      } else if (Object.values(bracketMap).includes(char)) {
        const last = stack.pop()
        if (char !== bracketMap[last!]) {
          return false
        }
      }
    }
    return stack.length === 0
  }

  const handleSubmit = () => {
    const result = validateBrackets(inputString)
    setIsValid(result)
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
      <Typography variant='h6'>Question 4: Validate Brackets</Typography>
      <TextField
        fullWidth
        variant='outlined'
        label='Enter a string of brackets'
        value={inputString}
        onChange={handleInputChange}
        sx={{ marginY: 2 }}
      />
      <Button
        variant='contained'
        color='primary'
        onClick={handleSubmit}
        disabled={!inputString}
      >
        Validate
      </Button>

      {isValid !== null && (
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
          <Typography color={isValid ? 'primary' : 'secondary'} variant='h6'>
            Result: {isValid ? 'Valid' : 'Invalid'}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default QuestionFour
