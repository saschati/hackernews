import React, { useEffect, useMemo, useState } from 'react'
import { Device, LayoutContext } from './LayoutContext'

const DISPLAY = {
  LAPTOP: 1199,
  TABLET: 992,
  MOBILE: 768,
}

const LayoutProvider: React.FC<React.PropsWithChildren> = ({ children }): JSX.Element => {
  const [device, setDevice] = useState<Device | null>(null)

  useEffect(() => {
    const listener = () => {
      let device: Device | null = null

      if (window.innerWidth >= DISPLAY.LAPTOP) {
        device = Device.DESCTOP
      } else if (window.innerWidth >= DISPLAY.TABLET) {
        device = Device.LAPTOP
      } else if (window.innerWidth >= DISPLAY.MOBILE) {
        device = Device.TABLET
      } else {
        device = Device.MOBILE
      }

      setDevice(device)

      document.documentElement.style.setProperty('--window-height', window.innerHeight + 'px')
      document.documentElement.style.setProperty('--window-width', window.innerWidth + 'px')
    }

    if (device === null) {
      listener()
    }

    window.addEventListener('resize', listener)

    return () => window.removeEventListener('resize', listener)
  }, [device])

  const context = useMemo(() => {
    return {
      device: device || Device.DESCTOP,
    }
  }, [device])

  return <LayoutContext.Provider value={context}>{children}</LayoutContext.Provider>
}

export default LayoutProvider
