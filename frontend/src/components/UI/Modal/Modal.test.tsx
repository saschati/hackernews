import React from 'react'
import Modal from './Modal'
import { render, screen } from '@testing-library/react'

describe('<Modal />', () => {
  test('renders <Modal />', () => {
    render(
      <Modal isOpen onClose={jest.fn()} title="Test Modal">
        Content Modal
      </Modal>
    )

    const modal = screen.getByTestId('modal')

    expect(modal).toBeInTheDocument()
    expect(modal).toHaveTextContent('Test Modal')
    expect(modal).toHaveTextContent('Content Modal')
  })

  test('no render <Modal />', () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()} title="Test Modal">
        Content Modal
      </Modal>
    )

    const modal = screen.queryByTestId('modal')

    expect(modal).not.toBeInTheDocument()
  })
})
