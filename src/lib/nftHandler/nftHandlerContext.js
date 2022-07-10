import React  from 'react'
import * as _ from 'lodash'
import { NFTHandler } from "./nftHandler"
import { GlobalState } from '../global'

const NFTHandlerContext = React.createContext(null)

class NFTHandlerProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nfts: []
    }

    GlobalState.NFTHandler = new NFTHandler(
      this.#getNFTs,
      this.#setNFTs
    )
  }

  maxNFTsReached = () => this.state.nfts.length >= process.env.REACT_APP_MAX_NFTS

  #getNFTs = () => _.clone(this.state.nfts, false)

  #setNFTs = (nfts) => {
    this.setState(() => ({
      nfts,
    }))
  }

  render() {
    return (
      <NFTHandlerContext.Provider
        value={{
          ...this.state,
          resetNFTState: this.resetNFTState,
          maxNFTsReached: this.maxNFTsReached
        }}
      >
        {this.props.children}
      </NFTHandlerContext.Provider>
    )
  }
}

const NFTHandlerConsumer = NFTHandlerContext.Consumer

export { NFTHandlerProvider, NFTHandlerConsumer, NFTHandlerContext }
