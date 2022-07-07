import React, { PureComponent } from "react";
import { Container, Box, Grid } from "@mui/material";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import { Title, BlockInput, StretchedButton } from "../atoms";
import { liveMonitorLink } from "../../lib/constants";

export class HomePage extends PureComponent {
  constructor() {
    super();

    this.state = {
      blockNumber: null,
    };
  }

  setBlockNumber(blockNumber) {
    this.setState({
      blockNumber,
    });
  }

  goToMonitorPage() {
    const blockNumber = this.state.blockNumber;
    const startBlockNumber = blockNumber ? blockNumber : "current";
    const url = `${liveMonitorLink}?startBlockNumber=${startBlockNumber}`;

    this.props.history.push(url);
  }

  render() {
    const { blockNumber } = this.state;

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
                onChange={(e) => this.setBlockNumber(e.target.value)}
                blockNumber={blockNumber}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StretchedButton
                endIcon={<AddToQueueIcon />}
                onClick={() => this.goToMonitorPage()}
              >
                GO!
              </StretchedButton>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }
}
