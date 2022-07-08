import { GlobalState } from '../global'

export class NFTHandler {
  #getNFTs
  #setNFTs

  constructor(getNFTs, setNFTs) {
    this.#getNFTs = getNFTs
    this.#setNFTs = setNFTs
  }

  
  handleNFT = (nft) => {
    const nfts = this.#getNFTs()
    if (nfts.length >= process.env.REACT_APP_MAX_NFTS) {
      GlobalState.Observer.emitMonitorStopEvent();

      return
    }

    this.#setNFTs([...nfts, nft])
  }
}
