import { EventEmitter } from 'events'
import { GlobalState } from '../global'

export class Observer {
  #eventEmitter
  #NFT_EVENT_KEY
  #MONITOR_STOP_KEY

  constructor() {
    this.#eventEmitter = new EventEmitter()
    this.#NFT_EVENT_KEY = 'nft_event'
    this.#MONITOR_STOP_KEY = 'monitor_stop'
    this.#onNFTEvent()
    this.#onMonitorStopEvent()
  }

  emitNFTEvent = (nft) => this.#eventEmitter.emit(this.#NFT_EVENT_KEY, nft)

  #onNFTEvent = () => this.#eventEmitter.on(this.#NFT_EVENT_KEY, (nft) => GlobalState.NFTHandler.handleNFT(nft))

  emitMonitorStopEvent = () => this.#eventEmitter.emit(this.#MONITOR_STOP_KEY)

  #onMonitorStopEvent = () => this.#eventEmitter.on(this.#MONITOR_STOP_KEY, () => GlobalState.Monitor.stop())
}
