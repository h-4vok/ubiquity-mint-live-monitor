import React, { useState, useEffect } from "react"
import { Grid, Stack, Box } from "@mui/material";
import { parse } from 'query-string'
import { Title, Label } from "../atoms"
import { FungibleTokenRow, BasicModal } from "../molecules";
import { useNFTHandler } from '../../lib/nftHandler'
import { useMonitor } from '../../lib/monitor'
import { GlobalState } from "../../lib/global";

export const LiveMonitorPage = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedNft, setSelectedNft] = useState({});
  const { nfts } = useNFTHandler()
  const { blockNumber, latestBlockNumber, monitorStopped, setMonitor } = useMonitor()

  // Debugging for debugging purposes
  useEffect(() => {
    console.log({nfts})
  }, [nfts])

  useEffect(() => {
    const startMonitoring = async () => {
      let { startBlockNumber } = parse(props.location.search)
      startBlockNumber = startBlockNumber || "current"

      console.log({ startBlockNumber })
      
      await GlobalState.Monitor.start(startBlockNumber)
    }

    startMonitoring()
  }, [props.location.search, setMonitor])

  const openNftDetail = (nftData) => {
    setSelectedNft(nftData);
    setOpenModal(true);
  };

  return (
    <Box>
      <Grid container className="text-align--left" spacing={2}>
        <Grid item xs={12}>
          <Title variant="h5">Ubiquity Live Mint Monitor</Title>
        </Grid>
        <Grid item xs={12}>
          <Label>Exploring... ({blockNumber} / {latestBlockNumber})</Label>
        </Grid>
        {
          monitorStopped && <Grid item xs={12}><Label>Max nfts reached, monitor has been stopped.</Label></Grid>
        }
      </Grid>
      <Stack spacing={2} className="margin-top--20px">
        {
          nfts.map((nft, index) => <FungibleTokenRow key={`NFT_${index}`} nft={nft} onOpenNftDetail={() => openNftDetail(nft)} />)
        }
      </Stack>
      <BasicModal
        open={openModal}
        setOpen={setOpenModal}
        nftData={selectedNft}
      />
    </Box>
  );
}
