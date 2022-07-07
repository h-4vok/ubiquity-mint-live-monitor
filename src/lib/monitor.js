import { UbiquityClient, NETWORKS, PROTOCOL } from "@ubiquity/ubiquity-ts-client"
import { Distiller } from "./distiller"

export class Monitor {
    #blockNumber
    #latestBlockNumber
    #client
    #distiller

    constructor(apiKey, blockNumber) {
      this.#blockNumber = blockNumber
      this.#client= new UbiquityClient(apiKey);
      this.#distiller = new Distiller();
    }

    async start() {
      console.log("starting monitor")

      this.#latestBlockNumber = await this.getLatestBlockNumber()

      const block = await this.getBlock()
      await this.#distiller.findNFTcandidates(block)
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