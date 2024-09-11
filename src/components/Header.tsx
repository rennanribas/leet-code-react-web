import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'

const Header: React.FC = () => {
  return (
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
          flexDirection: 'column',
          backgroundColor: 'primary',
        }}
      >
        <Typography variant='h6' color='white' align='center'>
          Metrobi Challenge - Rennan Ribas
        </Typography>

        <Typography variant='h4' color='white' align='center'>
          Header
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
