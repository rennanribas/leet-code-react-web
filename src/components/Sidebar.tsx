import React from 'react'
import { Box, Button, List, ListItem, Typography } from '@mui/material'

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        flexBasis: '60%',
        backgroundColor: '#ffa000',
        margin: 1,
        padding: 2,
        marginLeft: 0,
      }}
    >
      <Typography variant='h4' align='center'>
        Sidebar
      </Typography>
      <List>
        <ListItem>
          <Button color='primary'>Question 1: Find Duplicates</Button>
        </ListItem>
        <ListItem>
          <Button color='primary'>
            Question 3: Styling React Components using flex
          </Button>
        </ListItem>
      </List>
    </Box>
  )
}

export default Sidebar
