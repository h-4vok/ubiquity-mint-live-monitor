import { Paper, Stack, Container } from "@mui/material"
import { FungibleTokenThumbnail, Label, ShareTwitterButton } from "../atoms"
import { lineBreakCode } from "../../lib/constants"
const { encode } = require('url-encode-decode')

export const FungibleTokenRow = (props) => (
  <div>
    <Paper className="padding--40px hover-animation"
      onClick={() => goToNftDetail(props.nft, props.onOpenNftDetail)}>
      <Stack direction="row" spacing={2}>
        <FungibleTokenThumbnail imageSrc={props.nft.image} />
        <Container className="text-align--left">
          <Label variant="h4">{props.nft.name}</Label>
          <Label variant="h5">{props.nft.symbol}</Label>
          <Label variant="p">{props.nft.description}</Label>
        </Container>
      </Stack>
    </Paper>
    <ShareTwitterButton
      text={`Take a look at this awesome NFT!${lineBreakCode}${encode(props.nft.name)}${lineBreakCode}${encode(props.nft.symbol)}${lineBreakCode}Seller fee: ${props.nft.seller_fee_basis_points}${lineBreakCode}${encode(props.nft.image)}${lineBreakCode}`}
      url={props.nft.external_url}
      hashtags="SolanaNFT, NFT, UbiquityAPI, UbiquityHackaton23" />
  </div>
);

const goToNftDetail = (nftData, onOpenNftDetail) => {
  // we will show a popup of the nft data
  onOpenNftDetail(nftData);
};
