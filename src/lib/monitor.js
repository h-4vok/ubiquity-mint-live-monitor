import { UbiquityClient, NETWORKS, PROTOCOL } from "@ubiquity/ubiquity-ts-client";
import axios from "axios";

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

        if (tx) {
          // We take the NFT address from this parameter on the array element 1
          const nftAddress = tx.events[1].destination;

          const requestToSolscan = `https://api.solscan.io/account?address=${nftAddress}`;

          const nftData = await axios.get(requestToSolscan);
          console.log({nftData});

          // Now we bring the data from arweave
          const metadataUri = nftData.data.data.metadata.data.uri;
          console.log({metadataUri})
          
          const nftMetadata = await axios.get(metadataUri);
          console.log({nftMetadata});
        }

      } catch (e) {
        console.log(`error code::${e.response.status} url::${e.config.url}`)
      }
    }
}