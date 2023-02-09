import React from 'react'
import Error from './Error'
import { render, screen } from '@testing-library/react'

describe('<Error />', () => {
  test('renders <Error /> components', () => {
    render(<Error code={404} message="No found" />)

    const error = screen.getByTestId('error')
    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent('Error: 404')
    expect(error).toHaveTextContent('No found')
  })
})
