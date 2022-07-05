import { UbiquityClient, NETWORKS, PROTOCOL } from "@ubiquity/ubiquity-ts-client";

export class Monitor {
    #apiKey
    #client

    constructor(apiKey) {
      this.#apiKey = apiKey
      this.#client = new UbiquityClient(apiKey);
    }

    async start() {
      console.log("starting monitor")
      console.log(this.#apiKey)
      console.log(this.#client)

      await this.getLatestBlock();
    }

    async getLatestBlock() {
      console.log("getLatestBlock")
      try {
        const { data } = await this.#client.blocksApi.getBlock(PROTOCOL.SOLANA, NETWORKS.MAIN_NET, "current")
        console.log({data})
      } catch (e) {
        console.log(`error code::${e.response.status} url::${e.config.url}`)
      }
    }
}