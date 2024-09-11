import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('Metrobi Challenge Title', () => {
  render(<App />)
  const titleElement = screen.getByText(/Metrobi Technical Challenge/i)
  expect(titleElement).toBeInTheDocument()
})
