// const startMonitoring = async () => {
//   console.log(process.env);
//   const startBlockNumber = blockNumber ? blockNumber : "current";
//   console.log({ startBlockNumber });
//   // mover al inicio de monitor page
//   const monitor = new Monitor(
//     process.env.REACT_APP_API_KEY,
//     startBlockNumber
//   );
//   await monitor.start();
// };
import { Grid, Stack, Container, Box } from "@mui/material";
import { Title, Label } from "../atoms";
import { FungibleTokenRow } from "../molecules";

export const LiveMonitorPage = () => (
  <Box>
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
      <FungibleTokenRow />
      <FungibleTokenRow />
    </Stack>
  </Box>
);
