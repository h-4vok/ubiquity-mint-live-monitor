import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import Stack from '@mui/material/Stack';
//import logo from '../../../logo.svg';
import { Monitor } from "../../../lib/monitor";
import './Home.css';

const Home = () => {


  const [blockNumber, setBlockNumber] = useState('');

  const startMonitoring = async () => {
    console.log(process.env)
    const startBlockNumber = blockNumber ? blockNumber : "current"
    console.log({startBlockNumber})
    const monitor = new Monitor(process.env.REACT_APP_API_KEY, startBlockNumber);
    await monitor.start();
  }

    return (
      <div className="App">
        <header className="App-header">
          {
            //<img src={logo} className="App-logo" alt="logo" />
          }
          <h1>Ubiquity</h1>
          <h2>Live Mint Monitor</h2>
          <p>
            Monitor all NFT mints in the Solanas blockchain
          </p>
          <Stack direction="row" spacing={2}>
            <TextField
              id="outlined-number"
              label="Start with block"
              type="number"
              placeholder="Latest"
              value={blockNumber}
              onChange={e => setBlockNumber(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="contained"
              endIcon={<AddToQueueIcon />}
              onClick={() => startMonitoring()}>
              GO!
            </Button>
          </Stack>
        </header>
      </div>
    );
}

export default Home;