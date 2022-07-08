import { Observer } from './observer'
import { delay } from "../delay"

export const GlobalState = {
  NFTHandler: null,
  Monitor: null,
  Observer:  new Observer(),
};

export const resetStates = async () => {
  if (GlobalState.Monitor && GlobalState.Monitor.isRunning()) {
    GlobalState.Monitor.reset()
    while (GlobalState.Monitor.isProcessing()) {
      await delay(500)
    }
  }

  if (GlobalState.NFTHandler.getNFTsCount() > 0) {
    GlobalState.NFTHandler.reset()
  }
}