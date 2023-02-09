import React from 'react'
import Title from './Title'
import { render, screen } from '@testing-library/react'
import { mount } from 'enzyme'

describe('<Title />', () => {
  test('renders <Title />', () => {
    render(<Title>Test Title</Title>)

    const title = screen.getByTestId('text-title')

    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Test Title')
  })

  test('change size <Title />', () => {
    const wrappre = mount(<Title size="default">Test Title</Title>)

    expect(wrappre.props().size).toEqual('default')
    expect(wrappre.find('.title_size_default').exists()).toBeTruthy()
  })

  test('change position <Title />', () => {
    const wrappre = mount(<Title>Test Title</Title>)
    expect(wrappre.find('.title_position_default').exists()).toBeTruthy()

    wrappre.setProps({ position: 'center' })

    expect(wrappre.find('.title_position_default').exists()).not.toBeTruthy()
    expect(wrappre.find('.title_position_center').exists()).toBeTruthy()
  })
})
