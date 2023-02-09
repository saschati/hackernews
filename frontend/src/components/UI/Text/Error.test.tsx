import React from 'react'
import Error from './Error'
import { render, screen } from '@testing-library/react'

describe('<Error />', () => {
  test('renders <Error />', () => {
    render(<Error message="Some error" />)

    const error = screen.getByTestId('text-error')

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent('* Some error')
  })

  test('no renders <Error />', () => {
    render(<Error />)

    const error = screen.queryByTestId('alert-error')

    expect(error).not.toBeInTheDocument()
  })
})
