export class NFTHandler {
  #getNFTs
  #setNFTs

  constructor(getNFTs, setNFTs) {
    this.#getNFTs = getNFTs
    this.#setNFTs = setNFTs
  }

  addNFT = (nft) => {
    const nfts = this.#getNFTs()
    this.#setNFTs([...nfts, nft])
  }
}
