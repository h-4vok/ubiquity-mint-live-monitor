import { EventEmitter } from 'events'
import { GlobalState } from '../global'

export class Observer {
  #eventEmitter
  #NFT_EVENT_KEY

  constructor() {
    this.#eventEmitter = new EventEmitter()
    this.#NFT_EVENT_KEY = 'nft_event'
    this.#onNFTEvent()
  }

  emitNFTEvent = (nft) => this.#eventEmitter.emit(this.#NFT_EVENT_KEY, nft)

  #onNFTEvent = () => this.#eventEmitter.on(this.#NFT_EVENT_KEY, (nft) => GlobalState.NFTHandler.handleNFT(nft))
}
