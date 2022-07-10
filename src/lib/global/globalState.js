import { Observer } from './observer'

export const GlobalState = {
  NFTHandler: null,
  Observer:  new Observer()
};

export const resetNFTState = () => {
  if (GlobalState.NFTHandler.getNFTsCount() > 0) {
    GlobalState.NFTHandler.reset()
  }
}