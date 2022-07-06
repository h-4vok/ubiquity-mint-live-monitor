import React, { useState } from "react";
import { Button, Container, Box, Grid } from "@mui/material";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import { Monitor } from "../../lib/monitor";
import "./HomePage.css";
import { Title, BlockInput, StretchedButton } from "../atoms";

export const HomePage = () => {
  const [blockNumber, setBlockNumber] = useState("");

  const startMonitoring = async () => {
    console.log(process.env);
    const startBlockNumber = blockNumber ? blockNumber : "current";
    console.log({ startBlockNumber });
    const monitor = new Monitor(
      process.env.REACT_APP_API_KEY,
      startBlockNumber
    );
    await monitor.start();
  };

  return (
    <Container className="text-align--center">
      <Title>Ubiquity</Title>
      <Title>Live Mint Monitor</Title>
      <Title variant="h6">Monitor all NFT mints in the Solana blockchain</Title>

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
              onClick={() => startMonitoring()}
            >
              GO!
            </StretchedButton>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
