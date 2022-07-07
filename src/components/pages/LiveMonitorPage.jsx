import React, { useState, useEffect } from "react"
import { Grid, Stack, Box } from "@mui/material";
import { parse } from 'query-string'
import { Title, Label } from "../atoms"
import { FungibleTokenRow, BasicModal } from "../molecules";
import { useNFTHandler } from '../../lib/nftHandler/useNFTHandler'
import { GlobalState } from "../../lib/global";

export const LiveMonitorPage = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedNft, setSelectedNft] = useState(null);
  const { nfts, monitorStopped } = useNFTHandler()
  console.log({nfts})

  useEffect(() => {
    const startMonitoring = async () => {
      const { startBlockNumber } = parse(props.location.search)
      const blockNumber = startBlockNumber ? startBlockNumber : "current"
      console.log({ blockNumber })
      
      await GlobalState.Monitor.start(blockNumber)
    }

    startMonitoring();
  }, [props.location.search])

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
          <Label>Exploring... (current / latest)</Label>
        </Grid>
        {
          monitorStopped && <Grid item xs={12}><Label>Max nfts reached, monitor has been stopped.</Label></Grid>
        }
      </Grid>
      <Stack spacing={2} className="margin-top--20px">
        <FungibleTokenRow onOpenNftDetail={openNftDetail} />
        <FungibleTokenRow onOpenNftDetail={openNftDetail} />
        <FungibleTokenRow onOpenNftDetail={openNftDetail} />
        <FungibleTokenRow onOpenNftDetail={openNftDetail} />
      </Stack>
      <BasicModal
        open={openModal}
        setOpen={setOpenModal}
        nftData={selectedNft}
      />
    </Box>
  );
}
