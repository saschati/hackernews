import React from 'react'
import { FakeAuthProvider } from 'hoc/Auth'
import LinkList from './LinkList'
import { mount } from 'enzyme'
import Link from './Link'

const props = {
  links: [
    {
      id: 1,
      url: 'https://test1.test',
      description: 'Test 1',
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
    {
      id: 2,
      url: 'https://test2.test',
      description: 'Test 2',
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
    {
      id: 3,
      url: 'https://test3.test',
      description: 'Test 3',
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
  ],
  onLinkVote: jest.fn(),
}

describe('<LinkList />', () => {
  test('renders <LinkList /> components', () => {
    const wrapper = mount(
      <FakeAuthProvider isAuth={false}>
        <LinkList {...props} />
      </FakeAuthProvider>
    )

    expect(wrapper.find(Link).length).toEqual(3)
  })
})
