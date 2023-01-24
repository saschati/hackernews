import React from 'react'
import Header from 'components/Domain/Header'

const Layout: React.FC<React.PropsWithChildren> = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}

export default Layout
