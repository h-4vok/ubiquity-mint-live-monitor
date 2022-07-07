import React from 'react'
import * as _ from 'lodash'

const NFTHandlerContext = React.createContext(null)

const NFTHandlerProvider = ({ children }) => {
  const [nfts, setNFTs] = React.useState([]);
  
  const getNFTs = () => _.clone(nfts, false)

  const value = React.useMemo(
    () => ({
      nfts,
      setNFTs,
      getNFTs
    }),
    [nfts]
  );

  return (
    <NFTHandlerContext.Provider value={value}>
      {children}
    </NFTHandlerContext.Provider>
  );
}

const NFTHandlerConsumer = NFTHandlerContext.Consumer

export { NFTHandlerProvider, NFTHandlerConsumer, NFTHandlerContext }
