export class NFTHandler {
  #getNFTs
  #setNFTs

  constructor(getNFTs, setNFTs) {
    this.#getNFTs = getNFTs
    this.#setNFTs = setNFTs
  }
  
  getNFTsCount = () => this.#getNFTs().length
  
  handleNFT = (nft) => this.#setNFTs([...this.#getNFTs(), nft])

  reset = () => this.#setNFTs([])
}
