import axios from "axios"
import { solscanApi } from './constants'

export class NftDiscovery {

    async getNFTData(txCandidates) {
      console.log("getNFTData")

      const nfts = []
      for (var tx of txCandidates) {
        try {
            const nftAddress = tx.events[1].destination;

            const requestToSolscan = `${solscanApi}${nftAddress}`;
    
            const nftData = await axios.get(requestToSolscan);
            console.log({nftData});
    
            // Now we bring the data from arweave
            const metadataUri = nftData.data.data.metadata.data.uri;
            console.log({metadataUri})
                
            const { data } = await axios.get(metadataUri);
            console.log({data});

            nfts.push(data)
        } catch (e) {
            console.log(`error code::${e.response.status} url::${e.config.url}`)
        }
      }

      /*await txCandidates.forEach(async tx => {
        try {
            const nftAddress = tx.events[1].destination;
    
            const requestToSolscan = `https://api.solscan.io/account?address=${nftAddress}`;
      
            const nftData = await axios.get(requestToSolscan);
            console.log({nftData});
      
            // Now we bring the data from arweave
            const metadataUri = nftData.data.data.metadata.data.uri;
            console.log({metadataUri})
                
            const { data } = await axios.get(metadataUri);
            console.log({data});

            nfts.push(data)
        } catch (e) {
            console.log(`error code::${e.response.status} url::${e.config.url}`)
        }});*/

        console.log({nfts});
    }
}