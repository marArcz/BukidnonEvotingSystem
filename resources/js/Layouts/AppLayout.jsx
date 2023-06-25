import AppHeader from '@/Components/AppHeader'
import { PageLoaderDialog } from '@/Components/PageLoader'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

const AppLayout = ({ children,auth,noBg=false,noShadowHeader=false}) => {
  const [scrollPosition, setScrollPosition] = useState(0)

  window.onscroll = function(e){
    setScrollPosition(window.pageYOffset);
  }

  return (
    <div className={`app ${noBg?'no-bg':''}`}>
      <PageLoaderDialog/>
      <ToastContainer/>
      <AppHeader removeShadow={!noShadowHeader?false:scrollPosition <= 10} auth={auth} />
      {children}
    </div>
  )
}

export default AppLayout
