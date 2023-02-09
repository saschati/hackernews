import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { cx, XIcon } from '@vechaiui/react'

export type LogoutConfirmModalProps = React.PropsWithChildren & {
  title: string
  isOpen: boolean
  onClose(): void
}

const Modal: React.FC<LogoutConfirmModalProps> = ({
  children,
  title,
  isOpen,
  onClose,
}): JSX.Element => {
  return (
    <Transition show={isOpen} as={React.Fragment} unmount>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto z-modal"
        data-testid="modal"
        open={isOpen}
        onClose={onClose}
      >
        <Dialog.Overlay className="fixed top-0 left-0 w-screen h-screen bg-blackAlpha-600" />
        <Transition.Child
          as={React.Fragment}
          enter="transition ease-out duration-150"
          enterFrom="transform scale-95"
          enterTo="transform scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform scale-100"
          leaveTo="transform scale-95"
        >
          <div
            className={cx(
              'relative flex flex-col w-full mx-auto my-24 rounded shadow-lg',
              'bg-white border border-gray-200',
              'dark:bg-neutral-800 dark:border-neutral-700',
              'max-w-md px-2'
            )}
          >
            <div className="relative px-3 pt-3 pb-2 text-lg font-semibold">{title}</div>
            <button
              onClick={onClose}
              className="absolute text-sm text-gray-600 cursor-base dark:text-gray-400 hover:text-primary-500 top-4 right-4"
            >
              <XIcon label="" className="w-4 h-4" />
            </button>
            <div>{children}</div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default Modal
