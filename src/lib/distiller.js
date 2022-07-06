import axios from "axios";

export class Distiller {

    async getBlock(block) {
      console.log("getBlock")

      try {
        // TODO: Change this logic to find minting txs, I'm getting an example tx here:
        const tx = block.txs.find(x => x.id === "5LiE5fFChQmHYFNeCiB1tWdAVfF7GRBy2fs8kQJ2RN6Q6VdgALC44itbUdXKBbmAs34t8fTSDe3vjKJoU78RHDXp")
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