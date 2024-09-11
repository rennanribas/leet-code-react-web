import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  Box,
} from '@mui/material'

const QuestionOne: React.FC = () => {
  const [inputArray, setInputArray] = useState<string>('')
  const [duplicates, setDuplicates] = useState<any[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null)
    setInputArray(e.target.value)
  }

  const findDuplicates = (arr: any[]) => {
    const seen = new Set()
    const duplicates = new Set()
    arr.forEach((item) => {
      if (seen.has(item)) {
        duplicates.add(item)
      } else {
        seen.add(item)
      }
    })
    if (duplicates.size === 0) setErrorMessage('No duplicated items found')

    return Array.from(duplicates)
  }

  const handleSubmit = () => {
    const arr = inputArray.split(',').map((item) => item.trim())
    const result = findDuplicates(arr)
    setDuplicates(result)
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
        Question 1: Find Duplicated Items in an Array
      </Typography>
      <TextField
        fullWidth
        variant='outlined'
        label='Enter array elements (comma separated)'
        value={inputArray}
        onChange={handleInputChange}
        sx={{ marginY: 2 }}
      />
      <Button variant='contained' color='primary' onClick={handleSubmit}>
        Find Duplicates
      </Button>

      <Box
        sx={{
          marginTop: 3,
          textAlign: 'center',
          border: '1px solid grey',
          borderRadius: 2,
        }}
      >
        {duplicates.length > 0 && (
          <>
            <Typography color='primary' variant='h6'>
              Duplicated Items:
            </Typography>
            <List>
              {duplicates.map((item, index) => (
                <ListItem sx={{ flexFlow: 'column' }} key={index}>
                  <Typography color='primary' variant='h6'>
                    {item}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </>
        )}
        {errorMessage && (
          <Typography variant='h6' color='error'>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default QuestionOne
