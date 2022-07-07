import React, { useEffect } from "react"
import { Grid, Stack } from "@mui/material"
import { parse } from 'query-string'
import { Title, Label } from "../atoms"
import { FungibleTokenRow } from "../molecules"
import { Monitor } from "../../lib/monitor"
import { useNFTHandler } from '../../lib/nftHandler/useNFTHandler'

export const LiveMonitorPage = (props) => {
  const { nfts } = useNFTHandler()
  console.log({nfts})

  useEffect(() => {
    const startMonitoring = async () => {
      const { startBlockNumber } = parse(props.location.search)
      const blockNumber = startBlockNumber ? startBlockNumber : "current"
      console.log({ blockNumber })
      
      const monitor = new Monitor(
        process.env.REACT_APP_API_KEY,
        blockNumber
      )
      await monitor.start()
    }

    startMonitoring();
  }, [props.location.search])

  return (
    <>
      <Grid container className="text-align--left" spacing={2}>
        <Grid item xs={12}>
          <Title variant="h5">Ubiquity Live Mint Monitor</Title>
        </Grid>
        <Grid item xs={12}>
          <Label>Exploring... (current / latest)</Label>
        </Grid>
      </Grid>
      <Stack spacing={2} className="margin-top--20px">
        <FungibleTokenRow />
        <FungibleTokenRow />
      </Stack>
    </>
  );
}
