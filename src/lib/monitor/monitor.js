import { UbiquityClient, NETWORKS, PROTOCOL } from "@ubiquity/ubiquity-ts-client"
import { Distiller } from "../distiller"
import { delay } from '../delay'

export class Monitor {
    #processing
    #running
    #client
    #distiller
    #stopMonitor
    #setBlockNumber
    #setLatestBlockNumber

    constructor(apiKey, stopMonitor, setBlockNumber, setLatestBlockNumber) {
      this.#client= new UbiquityClient(apiKey)
      this.#distiller = new Distiller()
      this.#stopMonitor = stopMonitor
      this.#setBlockNumber = setBlockNumber
      this.#setLatestBlockNumber = setLatestBlockNumber
    }

    async start(startBlockNumber) {
      console.log('Running monitor')

      const latestBlockNumber = await this.#getLatestBlockNumber()
      let blockNumber = startBlockNumber === 'current' ? latestBlockNumber : startBlockNumber
      this.#setLatestBlockNumber(latestBlockNumber)
      this.#running = true

      while (latestBlockNumber >= blockNumber && this.isRunning()) {
        console.log(`Monitoring on block number: ${blockNumber}`)
        this.#processing = true

        if (blockNumber === -1) blockNumber = latestBlockNumber
        this.#setBlockNumber(blockNumber)
  
        // Cancel monitoring if we have reached the ending block
        // which is only used for debugging purposes
        if (!!latestBlockNumber && blockNumber > latestBlockNumber)
          return
  
        console.info(`${blockNumber} / ${latestBlockNumber}`)
  
        const block = await this.#getBlock(blockNumber)
        if (block) {
          await this.#distiller.findNFTcandidates(block)
        }
  
        blockNumber++

        await delay(1000)
        this.#processing = false
      }

      if (!this.isRunning()) {
        return
      }
  
      setTimeout(async () => await this.start(latestBlockNumber), 1000)
    }

    stop() {
      console.log(`Monitor ended, max nfts ammount(${process.env.REACT_APP_MAX_NFTS}) has been reached`)
      this.#running = false
      this.#stopMonitor()
    }

    reset() {
      this.#running = false
    }

    isRunning = () => this.#running

    isProcessing = () => this.#processing

    async #getLatestBlockNumber() {
      console.log("getLatestBlockNumber")

      try {
        const { data } = await this.#client
                                    .syncApi
                                    .currentBlockNumber(PROTOCOL.SOLANA, NETWORKS.MAIN_NET)
        
        console.log({data})
        return data
      } catch (e) {
        console.log(`error code::${e.response.status} url::${e.config.url}`)
      }
    }

    async #getBlock(blockNumber) {
      console.log("getBlock")

      try {
        const { data } = await this.#client
                                      .blocksApi
                                      .getBlock(PROTOCOL.SOLANA, NETWORKS.MAIN_NET, blockNumber)
        console.log({data})

        return data
      } catch (e) {
        console.log(`error code::${e.response.status} url::${e.config.url}`)
      }
    }
}