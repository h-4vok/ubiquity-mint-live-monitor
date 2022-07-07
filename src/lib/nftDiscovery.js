import axios from "axios"
import { solscanApi } from './constants'
import { GlobalState } from './global'

export class NftDiscovery {
    async getNFTData(txCandidates) {
      console.log("getNFTData")

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

            GlobalState.Observer.emitNFTEvent(data);
        } catch (e) {
          console.error({ e })
        }
      }
    }
}