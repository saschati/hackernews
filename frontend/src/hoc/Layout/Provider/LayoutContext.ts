import { createContext } from 'react'

export enum Device {
  DESCTOP,
  LAPTOP,
  TABLET,
  MOBILE,
}

export interface LayoutContextValue {
  device: Device
}

export const LayoutContext = createContext<LayoutContextValue | null>(null)
