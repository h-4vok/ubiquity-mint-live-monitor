import React, { useState, useEffect } from "react"
import { Grid, Stack, Box } from "@mui/material";
import { Title, Label } from "../atoms"
import { FungibleTokenRow, BasicModal } from "../molecules";
import { useNFTHandler } from '../../lib/nftHandler'
import { useMonitor } from '../../lib/monitor'

export const LiveMonitorPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedNft, setSelectedNft] = useState({})
  const { nfts, maxNFTsReached } = useNFTHandler()
  const { blockNumber, latestBlockNumber, start, stop } = useMonitor()

  useEffect(() => {
    const startMonitoring = async () => {
      await start()
    }
    
    startMonitoring()
  }, [start])

  useEffect(() => {
    console.log({nfts})

    if (maxNFTsReached()) {
      console.log(`Monitor has been stopped, max nfts ammount(${process.env.REACT_APP_MAX_NFTS}) reached.`)
      stop()
    }
  }, [nfts, maxNFTsReached, stop])

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
        <Label>
            {
              blockNumber && latestBlockNumber ? 
              `${maxNFTsReached() ? 'Stopped' : 'Exploring...'} (${blockNumber} / ${latestBlockNumber})` : 
              'Monitor is starting...'
            }
          </Label>
        </Grid>
        <Grid item xs={12}>
          <Label>
            {
              maxNFTsReached() ? `Monitor has been stopped, max nfts ammount(${process.env.REACT_APP_MAX_NFTS}) reached.` :
              `NFTs found: ${nfts.length} / ${process.env.REACT_APP_MAX_NFTS}`
            }
          </Label>
        </Grid>
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
