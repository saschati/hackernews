import React from 'react'
import Input from './Input'
import { render, screen } from '@testing-library/react'
import { Input as InputUI } from '@vechaiui/react'
import { mount } from 'enzyme'

describe('<Input />', () => {
  test('renders <Input />', () => {
    render(<Input type="text" />)

    const input = screen.getByTestId('input')

    expect(input).toBeInTheDocument()
  })

  test('show errorMessage <Input />', () => {
    const wrappre = mount(<Input type="text" errorMessage="Test Error Message" />)

    expect(wrappre.find(InputUI).props().invalid).toBeTruthy()
    expect(wrappre.find('.text-red-600').text()).toEqual('Test Error Message')
  })
})
