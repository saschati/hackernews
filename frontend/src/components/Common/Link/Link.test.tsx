import React from 'react'
import { render, screen } from '@testing-library/react'
import Link from './Link'
import { FakeAuthProvider } from 'hoc/Auth'
import { CheckIcon } from 'components/UI/Icon'
import { mount } from 'enzyme'

const props = {
  link: {
    id: 1,
    url: 'https://test.test',
    description: 'Test',
    postedBy: {
      id: '1',
      name: 'User',
      email: 'user@user.user',
      links: [],
      votes: [],
    },
    createdAt: '2023-02-09T11:21:01.417Z',
    votes: [],
  },
  onVote: jest.fn(),
}

describe('<Link />', () => {
  test('renders <Link /> components', () => {
    render(
      <FakeAuthProvider isAuth={false}>
        <Link {...props} />
      </FakeAuthProvider>
    )

    const link = screen.getByTestId('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveTextContent(props.link.url)
  })

  test('no auth <Link /> components', () => {
    const wrapper = mount(
      <FakeAuthProvider isAuth={false}>
        <Link {...props} />
      </FakeAuthProvider>
    )

    expect(wrapper.find(CheckIcon).exists()).toEqual(false)
  })

  test('auth <Link /> components', () => {
    const wrapper = mount(
      <FakeAuthProvider isAuth={true}>
        <Link {...props} />
      </FakeAuthProvider>
    )

    expect(wrapper.find(CheckIcon).exists()).toEqual(true)
  })
})
