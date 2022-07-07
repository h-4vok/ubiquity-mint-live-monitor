import { Paper, Stack, Container } from "@mui/material";
import { FungibleTokenThumbnail, Label } from "../atoms";

export const FungibleTokenRow = (props) => (
  <div onClick={() => goToNftDetail({}, props.onOpenNftDetail)}>
    <Paper className="padding--40px hover-animation">
      <Stack direction="row" spacing={2}>
        <FungibleTokenThumbnail imageSrc="https://www.arweave.net/oiY7orCWNjVt8HkSgZKt2zql7LcsOpoo5W8W_fjKmIg?ext=png" />
        <Container className="text-align--left">
          <Label variant="h4">NFT name</Label>
          <Label variant="span">NFT uri</Label>
        </Container>
      </Stack>
    </Paper>
  </div>
);

const goToNftDetail = (nftData, onOpenNftDetail) => {
  // we will show a popup of the nft data
  onOpenNftDetail({});
};
