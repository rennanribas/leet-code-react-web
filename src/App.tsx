import React, { lazy, Suspense } from 'react'
import { Box, CircularProgress } from '@mui/material'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'

const QuestionOne = lazy(() => import('./components/Questions/QuestionOne'))
const QuestionTwo = lazy(() => import('./components/Questions/QuestionTwo'))
const QuestionThree = lazy(
  () => import('./components/Questions/QuestionThree/QuestionThree')
)
const QuestionFour = lazy(() => import('./components/Questions/QuestionFour'))
const QuestionFive = lazy(() => import('./components/Questions/QuestionFive'))
const QuestionSix = lazy(() => import('./components/Questions/QuestionSix'))
const QuestionSeven = lazy(() => import('./components/Questions/QuestionSeven'))

const App: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: '80vh',
        paddingY: '10vh',
      }}
    >
      <Router>
        <Header />
        <Box
          sx={{
            display: 'flex',
            flexBasis: '100%',
            flexDirection: 'column',
            marginY: 1,
          }}
        >
          <Suspense fallback={<CircularProgress />}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/question1' element={<QuestionOne />} />
              <Route path='/question2' element={<QuestionTwo />} />
              <Route path='/question3' element={<QuestionThree />} />
              <Route path='/question4' element={<QuestionFour />} />
              <Route path='/question5' element={<QuestionFive />} />
              <Route path='/question6' element={<QuestionSix />} />
              <Route path='/question7' element={<QuestionSeven />} />
            </Routes>
          </Suspense>
        </Box>
        <Footer />
      </Router>
    </Box>
  )
}

export default App
