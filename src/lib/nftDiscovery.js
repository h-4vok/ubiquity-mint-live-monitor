import axios from "axios";
import {
  solscanApiGetAccount,
  buildUriSolscanApiGetHolders,
} from "./constants";
import { GlobalState } from "./global";

export class NftDiscovery {
  async getNFTData(txCandidates) {
    for (var tx of txCandidates) {
      try {
        const nftAddress = tx.events[1].destination;

        const requestToSolscan = `${solscanApiGetAccount}${nftAddress}`;

        const nftData = await axios.get(requestToSolscan);

        // Now we bring the data from arweave
        const metadataUri = nftData.data.data.metadata.data.uri;

        const { data } = await axios.get(metadataUri);

        // We bring the current owner information
        const getOwnerUri = buildUriSolscanApiGetHolders(nftAddress);
        const ownerData = await axios.get(getOwnerUri);

        data.ownerData = ownerData.data.data[0];
        console.log({ discoveryData: data });

        GlobalState.Observer.emitNFTEvent({
          ...data,
          address: nftData.data.data.account,
        });
      } catch (e) {
        console.error({ e });
      }
    }
  }
}
