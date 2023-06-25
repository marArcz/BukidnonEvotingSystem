import React from 'react'
import OverlayTop from '../../images/overlay-top.png'
import OverlayBottom from '../../images/overlay-bottom.png'
import { Image } from 'react-bootstrap'

const AppBgOverlay = ({ bottom = true, top = true, full = false, hideBottom = false }) => {
  return (
    <div className={`page-overlay ${full ? 'full' : ''} ${!bottom ? 'hide-bottom-sm' : ''}`}>
      <div className="top">
        <Image fluid src={OverlayTop} alt="" />
      </div>
      {
        !hideBottom && (
          <div className="bottom">
            <Image fluid src={OverlayBottom} alt="" />
          </div>
        )
      }
    </div>
  )
}

export default AppBgOverlay
