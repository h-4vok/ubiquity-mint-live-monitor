import { GlobalState } from '../global'

export class NFTHandler {
  #getNFTs
  #setNFTs
  #resetNFTHandlerState

  constructor(getNFTs, setNFTs, resetNFTHandlerState) {
    this.#getNFTs = getNFTs
    this.#setNFTs = setNFTs
    this.#resetNFTHandlerState = resetNFTHandlerState
  }

  
  handleNFT = (nft) => {
    const nfts = this.#getNFTs()
    if (nfts.length >= process.env.REACT_APP_MAX_NFTS) {
      GlobalState.Observer.emitMonitorStopEvent();

      return
    }

    this.#setNFTs([...nfts, nft])
  }

  reset = () => this.#resetNFTHandlerState()
}
