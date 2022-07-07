import { UbiquityClient, NETWORKS, PROTOCOL } from "@ubiquity/ubiquity-ts-client"
import { Distiller } from "./distiller"
import { delay } from './delay'

export class Monitor {
    #run
    #stopMonitor 
    #startedBlock
    #blockNumber
    #latestBlockNumber
    #client
    #distiller

    constructor(apiKey, stopMonitor ) {
      this.#stopMonitor = stopMonitor 
      this.#run = true
      this.#client= new UbiquityClient(apiKey)
      this.#distiller = new Distiller()
    }

    async start(blockNumber) {
      console.log('Running monitor')

      this.#startedBlock = blockNumber
      this.#blockNumber = blockNumber
      this.#latestBlockNumber = await this.getLatestBlockNumber()
      
      while (this.#latestBlockNumber >= this.#blockNumber && this.#run) {
        console.log(`Monitoring on block number: ${this.#blockNumber}`)

        if (this.#blockNumber === -1) this.#blockNumber = this.#latestBlockNumber
  
        // Cancel monitoring if we have reached the ending block
        // which is only used for debugging purposes
        if (!!this.#latestBlockNumber && this.#blockNumber > this.#latestBlockNumber)
          return
  
        console.info(`${this.#blockNumber} / ${this.#latestBlockNumber}`)
  
        const block = await this.getBlock()
        if (block) {
          await this.#distiller.findNFTcandidates(block)
        }
  
        this.#blockNumber++

        await delay(1000)
      }

      if (!this.#run) {
        return
      }
  
      setTimeout(async () => await this.start(), 1000)
    }

    stop() {
      console.log(`Monitor ended, max nfts ammount(${process.env.REACT_APP_MAX_NFTS}) has been reached`)
      this.#stopMonitor()
      this.#run = false
    }

    async getLatestBlockNumber() {
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

    async getBlock() {
      console.log("getBlock")

      try {
        const { data } = await this.#client
                                      .blocksApi
                                      .getBlock(PROTOCOL.SOLANA, NETWORKS.MAIN_NET, this.#blockNumber)
        console.log({data})

        return data
      } catch (e) {
        console.log(`error code::${e.response.status} url::${e.config.url}`)
      }
    }
}