import { Paper, Stack, Container } from "@mui/material";
import { FungibleTokenThumbnail, Label } from "../atoms";

export const FungibleTokenRow = (props) => (
  <div onClick={() => goToNftDetail(props.nft, props.onOpenNftDetail)}>
    <Paper className="padding--40px hover-animation">
      <Stack direction="row" spacing={2}>
        <FungibleTokenThumbnail imageSrc={props.nft.image} />
        <Container className="text-align--left">
          <Label variant="h4">{props.nft.name}</Label>
          <Label variant="h5">{props.nft.symbol}</Label>
          <Label variant="p">{props.nft.description}</Label>
        </Container>
      </Stack>
    </Paper>
  </div>
);

const goToNftDetail = (nftData, onOpenNftDetail) => {
  // we will show a popup of the nft data
  onOpenNftDetail(nftData);
};
