export class NFTHandler {
  #getNFTs
  #setNFTs

  constructor(getNFTs, setNFTs) {
    this.#getNFTs = getNFTs
    this.#setNFTs = setNFTs
  }

  addNFT = (nft) => {
    const nfts = this.#getNFTs()
    nfts.push(nft)
    console.log('NFTHandler', nfts)
    this.#setNFTs(nfts)
  }
}
