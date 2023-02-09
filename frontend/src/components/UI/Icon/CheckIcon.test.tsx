import React from 'react'
import { mount } from 'enzyme'
import CheckIcon from './CheckIcon'
import { render, screen } from '@testing-library/react'

describe('<CheckIcon />', () => {
  test('renders <CheckIcon /> components', () => {
    render(<CheckIcon />)

    const error = screen.getByTestId('checkicon')

    expect(error).toBeInTheDocument()
  })

  test('renders isActive <CheckIcon />', () => {
    const wrapper = mount(<CheckIcon isActive />)

    expect(wrapper.props().isActive).toBeTruthy()
    expect(wrapper.find('.checkIcon_type_active').exists()).toBeTruthy()
  })
})
