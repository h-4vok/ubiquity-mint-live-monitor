import React, { useState } from "react"
import { Container, Box, Grid } from "@mui/material"
import AddToQueueIcon from "@mui/icons-material/AddToQueue"
import { Monitor } from "../../lib/monitor"
import { useNFTHandler } from '../../lib/nftHandler/useNFTHandler'
import { GlobalState } from '../../lib/global'
import { Observer } from '../../lib/global'
import { Title, BlockInput, StretchedButton } from "../atoms"
import { liveMonitorLink } from "../../lib/constants";
import { useHistory } from "react-router-dom";
import "./HomePage.css"

export const HomePage = () => {
  const history = useHistory();
  const [blockNumber, setBlockNumber] = useState("")
  const { nfts, setNFTs, getNFTs } = useNFTHandler()
  console.log({nfts})

  const startMonitoring = async () => {
    console.log(process.env)
    const startBlockNumber = blockNumber ? blockNumber : "current"
    console.log({ startBlockNumber })

    GlobalState.Observer = new Observer(setNFTs, getNFTs)
    
    const monitor = new Monitor(
      process.env.REACT_APP_API_KEY,
      startBlockNumber
    )
    await monitor.start()
  }

  return (
    <Container className="text-align--center">
      <Title>Ubiquity</Title>
      <Title>Live Mint Monitor</Title>
      <Title variant="h6">
        Monitor all NFT mints in the Solana blockchain
      </Title>

      <Box className="box">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <BlockInput
              label="Start with block..."
              placeholder="Latest"
              onChange={(e) => setBlockNumber(e.target.value)}
              blockNumber={blockNumber}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StretchedButton
              endIcon={<AddToQueueIcon />}
              onClick={() => goToMonitorPage(blockNumber, history)}
            >
              GO!
            </StretchedButton>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
  
const goToMonitorPage = (blockNumber, history) => {
  const startBlockNumber = blockNumber ? blockNumber : "current";
  const url = `${liveMonitorLink}?startBlockNumber=${startBlockNumber}`;

  history.push(url);
}
