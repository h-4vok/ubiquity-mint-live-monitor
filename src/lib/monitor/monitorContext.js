import React  from 'react'
import { Monitor } from "../monitor"
import { GlobalState } from '../global'

const MonitorContext = React.createContext(null)

class MonitorProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      monitorStopped: false,
      blockNumber: 0,
      latestBlockNumber: 0
    }
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

  setMonitor = () => {
    this.setState(() => ({
      monitorStopped: false,
      blockNumber: 0,
      latestBlockNumber: 0
    }))
    
    GlobalState.Monitor = new Monitor(
      process.env.REACT_APP_API_KEY,
      this.#stopMonitor,
      this.#setBlockNumber,
      this.#setLatestBlockNumber
    )
  }

  render() {
    return (
      <MonitorContext.Provider
        value={{
          ...this.state,
          setMonitor: this.setMonitor
        }}
      >
        {this.props.children}
      </MonitorContext.Provider>
    )
  }
}

const MonitorConsumer = MonitorContext.Consumer

export { MonitorProvider, MonitorConsumer, MonitorContext }
