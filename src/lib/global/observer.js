import { EventEmitter } from 'events'

export class Observer {
  #setNFTs
  #getNFTs
  #eventEmitter
  #NFT_EVENT_KEY

  constructor(setNFTs, getNFTs) {
    this.#setNFTs = setNFTs
    this.#getNFTs = getNFTs
    this.#eventEmitter = new EventEmitter()
    this.#NFT_EVENT_KEY = 'nft_event'
    this.#listen()
  }

  emitNFTEvent = (nft) => {
    this.#eventEmitter.emit(this.#NFT_EVENT_KEY, nft)
  }

  #onNFTEvent = () => {
    this.#eventEmitter.on(this.#NFT_EVENT_KEY, (nft) => {
      const nfts = this.#getNFTs()
      this.#setNFTs([...nfts, nft])
    })
  }

  #listen = () => {
    this.#onNFTEvent()
  }
}
