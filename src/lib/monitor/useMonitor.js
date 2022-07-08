import React from 'react'
import { MonitorContext } from './monitorContext'

export function useMonitor() {
  return React.useContext(MonitorContext)
}
