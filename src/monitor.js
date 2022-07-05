import { UbiquityClient, NETWORKS, PROTOCOL } from "@ubiquity/ubiquity-ts-client";

export class Monitor {
    #apiKey
    #blockNumber
    #client

    constructor(apiKey, blockNumber) {
      this.#apiKey = apiKey
      this.#blockNumber = blockNumber
      this.#client = new UbiquityClient(apiKey);
    }

    async start() {
      console.log("starting monitor")
      console.log(this.#apiKey)
      console.log(this.#blockNumber)
      console.log(this.#client)

      await this.getBlock();
    }

    async getBlock() {
      console.log("getBlock")

      try {
        const { data } = await this.#client.blocksApi.getBlock(PROTOCOL.SOLANA, NETWORKS.MAIN_NET, this.#blockNumber)
        console.log({data})

        // TODO: Change this logic to find minting txs, I'm getting an example tx here:
        const tx = data.txs.find(x => x.id === "5LiE5fFChQmHYFNeCiB1tWdAVfF7GRBy2fs8kQJ2RN6Q6VdgALC44itbUdXKBbmAs34t8fTSDe3vjKJoU78RHDXp")
        console.log({tx})
      } catch (e) {
        console.log(`error code::${e.response.status} url::${e.config.url}`)
      }
    }
}