import React, { useCallback }  from 'react'
import * as _ from 'lodash'

const NFTHandlerContext = React.createContext(null)

const NFTHandlerProvider = ({ children }) => {
  const [nfts, setNFTs] = React.useState([]);
  
  const getCloneNFTs = () => _.clone(nfts, false)
  
  const getNFTs = useCallback(getCloneNFTs, [nfts]);

  const value = React.useMemo(
    () => ({
      nfts,
      setNFTs,
      getNFTs
    }),
    [nfts, getNFTs]
  );

  return (
    <NFTHandlerContext.Provider value={value}>
      {children}
    </NFTHandlerContext.Provider>
  );
}

const NFTHandlerConsumer = NFTHandlerContext.Consumer

export { NFTHandlerProvider, NFTHandlerConsumer, NFTHandlerContext }
