import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  ListItem,
  Box,
  Button,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { Link, useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleMenuItemClick = (questionNumber: number) => {
    navigate(`/question${questionNumber}`)
    toggleSidebar()
  }

  return (
    <>
      <AppBar
        sx={{
          height: '10vh',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Toolbar
          sx={{
            flexBasis: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'primary.main',
            paddingX: 2,
          }}
        >
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={toggleSidebar}
            sx={{ position: 'absolute', left: 10 }}
          >
            <MenuIcon sx={{ color: 'white' }} />
          </IconButton>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Typography variant='h6' color='white'>
              Coding Challenge - Rennan Ribas
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor='left'
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: 2,
            backgroundColor: 'primary.main',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginBottom: 2,
            }}
          >
            <IconButton
              edge='start'
              color='inherit'
              aria-label='close'
              onClick={toggleSidebar}
            >
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>
          {[1, 2, 3, 4, 5, 6, 7].map((questionNumber) => (
            <ListItem
              key={questionNumber}
              onClick={() => handleMenuItemClick(questionNumber)}
              sx={{ cursor: 'pointer' }}
            >
              <Button
                color='primary'
                sx={{
                  color: 'white',
                  border: '1px solid white',
                  width: '80%',
                }}
              >{`Question ${questionNumber}`}</Button>
            </ListItem>
          ))}
        </Box>
      </Drawer>
    </>
  )
}

export default Header
