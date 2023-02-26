import React from 'react'
import ReactDOM from 'react-dom'

const modalRoot = document.querySelector('#modal-root') as HTMLElement

const ModalPortal: React.FC<React.PropsWithChildren> = ({ children }): React.ReactPortal => {
  return ReactDOM.createPortal(children, modalRoot)
}

export default ModalPortal
