import AppHeader from '@/Components/AppHeader'
import { PageLoaderDialog } from '@/Components/PageLoader'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

const AppLayout = ({ children, auth, noBg = false, noShadowHeader = false,headerBg='white',headerVariant="light" }) => {
  const [scrollPosition, setScrollPosition] = useState(0)

  window.onscroll = function (e) {
    setScrollPosition(window.pageYOffset);
  }

  return (
    <div className={`app ${noBg ? 'no-bg' : ''}`}>
      <PageLoaderDialog />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
      />
      <AppHeader variant={headerVariant} bg={headerBg} removeShadow={!noShadowHeader ? false : scrollPosition <= 10} auth={auth} />
      {children}
    </div>
  )
}

export default AppLayout
