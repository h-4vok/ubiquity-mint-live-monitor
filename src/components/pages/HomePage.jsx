import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Container, Box, Grid } from "@mui/material"
import AddToQueueIcon from "@mui/icons-material/AddToQueue"
import { Title, BlockInput, StretchedButton } from "../atoms"
import { liveMonitorLink } from "../../lib/constants"
import {  resetStates } from "../../lib/global"
import { useMonitor } from "../../lib/monitor"

export const HomePage = () => {
  const history = useHistory();
  const [blockNumber, setBlockNumber] = useState("")
  const { setStartBlockNumber } = useMonitor()

  const goToMonitorPage = async (blockNumber, history) => {
    await setStartBlockNumber(blockNumber || 'current')
    await resetStates()

    history.push(liveMonitorLink)
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
