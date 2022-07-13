import { NftDiscovery } from "./nftDiscovery";

export class Distiller {
  #nftDiscovery;

  constructor() {
    this.#nftDiscovery = new NftDiscovery();
  }

  async findNFTcandidates(block) {
    const txCandidates = block.txs.filter(
      (x) => x.events.length === 6 && x.events[1].type === "create_account"
    );

    if (txCandidates) {
      this.#nftDiscovery.getNFTData(txCandidates);
    }
  }
}
