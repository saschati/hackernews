import Path from 'config/path'
import useAuth from 'hooks/useAuth'
import React, { useMemo } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { cx, Divider, Avatar } from '@vechaiui/react'
import { useNavigate } from 'react-router-dom'

const Profile: React.FC = (): JSX.Element => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const items = useMemo(() => {
    return [
      {
        href: Path.LINK_CREATE_LINK,
        label: 'Create Link',
      },
    ]
  }, [])

  return (
    <div>
      <Menu as="div" className="relative inline-block">
        <Menu.Button as={'div'}>
          <Avatar name={user.get('name')} size="lg" className="cursor-pointer hover:bg-blue-400" />
        </Menu.Button>
        <Transition
          as={React.Fragment}
          unmount={true}
          enter="transition ease-in-out duration-150"
          enterFrom="transform opacity-0 scale-90"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-out duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-90"
        >
          <Menu.Items
            className={cx(
              'absolute right-0 z-dropdown w-56 min-w-max mt-1 origin-top-right rounded-md shadow-sm outline-none',
              'bg-white border border-gray-200',
              'dark:bg-neutral-800 dark:border-gray-700'
            )}
          >
            <div className="px-1 py-1">
              <div role="group">
                <div className="mx-3 my-2 text-sm font-semibold">Profile</div>
                {items.map((item) => (
                  <Menu.Item key={item.href}>
                    {({ active, disabled }) => (
                      <button
                        disabled={disabled}
                        aria-disabled={disabled}
                        onClick={() => navigate(item.href)}
                        className={cx(
                          'flex rounded items-center w-full px-3 h-8 flex-shrink-0 text-sm text-left cursor-pointer focus:outline-none',
                          active && 'bg-blue-500 text-white',
                          disabled && 'disabled:opacity-60 disabled:cursor-not-allowed'
                        )}
                      >
                        {item.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
              <Divider
                orientation="horizontal"
                className="border-neutral-200 dark:border-neutral-700"
              />
              <Menu.Item>
                {({ active, disabled }) => (
                  <button
                    disabled={disabled}
                    aria-disabled={disabled}
                    onClick={logout}
                    className={cx(
                      'flex rounded items-center w-full px-3 h-8 flex-shrink-0 text-sm text-left cursor-pointer focus:outline-none',
                      active && 'text-blue-500',
                      disabled && 'disabled:opacity-60 disabled:cursor-not-allowed'
                    )}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Profile
