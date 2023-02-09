import React from 'react'
import Pagginate from './Pagginate'
import { render, screen } from '@testing-library/react'
import { mount } from 'enzyme'

describe('<Pagginate />', () => {
  test('renders <Pagginate />', () => {
    render(
      <Pagginate className="test-pagginate" pageCount={3} onChange={jest.fn()} forcePage={1} />
    )

    const pagginate = screen.getByLabelText('Pagination')

    expect(pagginate).toBeInTheDocument()
  })

  test('count page <Pagginate />', () => {
    const wrappre = mount(<Pagginate pageCount={3} onChange={jest.fn()} forcePage={1} />)

    expect(wrappre.find('.pagginate__item').length).toEqual(5)
  })

  test('active page <Pagginate />', () => {
    const wrappre = mount(<Pagginate pageCount={3} onChange={jest.fn()} forcePage={2} />)

    expect(wrappre.find('.pagginate__item_type_active').text()).toEqual('2')
  })
})
