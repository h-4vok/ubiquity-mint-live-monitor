import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Box, Grid } from "@mui/material";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import { Title, BlockInput, StretchedButton } from "../atoms";
import { liveMonitorLink } from "../../lib/constants";
import { useMonitor } from "../../lib/monitor";
import { resetNFTState } from "../../lib/global";

export const HomePage = () => {
  const history = useHistory();
  const [blockNumber, setBlockNumber] = useState("");
  const { monitor, setStartBlockNumber, resetMonitorState } = useMonitor();

  const goToMonitorPage = async (blockNumber, history) => {
    await setStartBlockNumber(blockNumber || "current");

    history.push(liveMonitorLink);
  };

  useEffect(() => {
    if (monitor) {
      resetMonitorState();
    }

    resetNFTState();
  }, [monitor, resetMonitorState]);

  return (
    <Container className="text-align--center">
      <Title>Ubiquity</Title>
      <Title>Live Mint Monitor</Title>

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
      <Title variant="h6">&nbsp;</Title>
      <Title variant="h6">Monitor all NFT mints in the Solana blockchain</Title>
    </Container>
  );
};
