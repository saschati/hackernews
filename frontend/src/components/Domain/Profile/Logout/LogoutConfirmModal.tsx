import React from 'react'
import { Button, Divider } from '@vechaiui/react'
import Modal from 'components/UI/Modal'

export type LogoutConfirmModalProps = {
  isOpen: boolean
  onLogout(): void
  onCancel(): void
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  isOpen,
  onLogout,
  onCancel,
}): JSX.Element => {
  return (
    <Modal isOpen={isOpen} title="Confirm Logout" onClose={onCancel}>
      <Divider orientation="horizontal" className="border-neutral-200 dark:border-neutral-700" />
      <div className="flex-1 px-3 py-2">
        <p className="mb-4 text-sm font-normal">
          Are you sure you want to log out of your account?
        </p>
      </div>
      <Divider orientation="horizontal" className="border-neutral-200 dark:border-neutral-700" />
      <footer className="flex justify-end px-3 py-2 space-x-4">
        <Button onClick={onCancel}>Cancel</Button>
        <Button color="red" onClick={onLogout}>
          Logout
        </Button>
      </footer>
    </Modal>
  )
}

export default LogoutConfirmModal
