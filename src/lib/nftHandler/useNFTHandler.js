import React from 'react'
import { NFTHandlerContext } from './nftHandlerContext'

export function useNFTHandler() {
  return React.useContext(NFTHandlerContext)
}
