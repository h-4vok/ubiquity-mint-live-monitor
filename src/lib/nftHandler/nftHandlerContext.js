import React  from 'react'
import * as _ from 'lodash'
import { NFTHandler } from "./nftHandler"
import { Monitor } from "../monitor"
import { GlobalState } from '../global'

const NFTHandlerContext = React.createContext(null)

class NFTHandlerProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nfts: [],
      monitorStopped: false
    }

    GlobalState.NFTHandler = new NFTHandler(
      this.#getNFTs,
      this.#setNFTs
    )

    GlobalState.Monitor = new Monitor(
      process.env.REACT_APP_API_KEY,
      this.#stopMonitor 
    )
  }
  
  #getNFTs = () => _.clone(this.state.nfts, false)

  #setNFTs = (nfts) => {
    this.setState(() => ({
      nfts,
    }))
  }
  
  #stopMonitor = () => {
    this.setState(() => ({
      monitorStopped: true,
    }))
  }

  render() {
    return (
      <NFTHandlerContext.Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </NFTHandlerContext.Provider>
    )
  }
}

const NFTHandlerConsumer = NFTHandlerContext.Consumer

export { NFTHandlerProvider, NFTHandlerConsumer, NFTHandlerContext }
