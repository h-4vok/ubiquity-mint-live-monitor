import React  from 'react'
import { Monitor } from "../monitor"

const MonitorContext = React.createContext(null)

class MonitorProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      monitor: null,
      monitorStopped: false,
      startBlockNumber: -1,
      blockNumber: 0,
      latestBlockNumber: 0
    }
  }

  start = async () => {
    this.setState(() => ({
      monitor: new Monitor(
        process.env.REACT_APP_API_KEY,
        this.#stopMonitor,
        this.#setBlockNumber,
        this.#setLatestBlockNumber
      )
    }), async () => await this.state.monitor.start(this.state.startBlockNumber))
  }

  resetMonitorState = () => {
    this.state.monitor.stop()
    this.setState(() => ({
      monitor: null,
      monitorStopped: false,
      blockNumber: 0,
      latestBlockNumber: 0
    }))
  }

  isRunning = () => this.state.monitor && this.state.monitor.isRunning()
  
  setStartBlockNumber = (startBlockNumber) => {
    this.setState(() => ({
      startBlockNumber
    }))
  }

  #stopMonitor = () => {
    this.setState(() => ({
      monitorStopped: true,
    }))
  }

  #setBlockNumber = (blockNumber) => {
    this.setState(() => ({
      blockNumber
    }))
  }

  #setLatestBlockNumber = (latestBlockNumber) => {
    this.setState(() => ({
      latestBlockNumber
    }))
  }

  render() {
    return (
      <MonitorContext.Provider
        value={{
          ...this.state,
          setStartBlockNumber: this.setStartBlockNumber,
          start: this.start,
          resetMonitorState: this.resetMonitorState,
          isRunning: this.isRunning
        }}
      >
        {this.props.children}
      </MonitorContext.Provider>
    )
  }
}

const MonitorConsumer = MonitorContext.Consumer

export { MonitorProvider, MonitorConsumer, MonitorContext }
