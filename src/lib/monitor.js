import { UbiquityClient, NETWORKS, PROTOCOL } from "@ubiquity/ubiquity-ts-client"
import { Distiller } from "./distiller"
import { delay } from './delay'

export class Monitor {
    #startedBlock
    #blockNumber
    #latestBlockNumber
    #client
    #distiller

    constructor(apiKey, blockNumber) {
      this.#startedBlock = blockNumber
      this.#blockNumber = blockNumber
      this.#client= new UbiquityClient(apiKey);
      this.#distiller = new Distiller();
    }

    async run() {
      console.log('Running monitor')

      this.#latestBlockNumber = await this.getLatestBlockNumber()
      
      while (this.#latestBlockNumber >= this.#blockNumber) {
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
  
      setTimeout(async () => await this.run(), 1000)
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

        return data;
      } catch (e) {
        console.log(`error code::${e.response.status} url::${e.config.url}`)
      }
    }
}