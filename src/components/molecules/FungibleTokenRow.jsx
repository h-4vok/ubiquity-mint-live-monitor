import { Paper, Stack, Grid } from "@mui/material";
import { FungibleTokenThumbnail, Label, ShareTwitterButton } from "../atoms";
import { lineBreakCode, solscanUrl } from "../../lib/constants";
import { formatRoyalties } from "../../lib/formatting/numberFormat";
const { encode } = require("url-encode-decode");

export const FungibleTokenRow = (props) => (
  <div>
    <Paper
      className="padding--40px hover-animation cursor--pointer nft-row"
      onClick={() => goToNftDetail(props.nft, props.onOpenNftDetail)}
    >
      <Stack direction="row" spacing={2}>
        <FungibleTokenThumbnail imageSrc={props.nft.image} />
        <Grid container className="text-align--left">
          <Grid item xs={12} sm={6}>
            <Label variant="h4">{props.nft.name}</Label>
            <Label variant="h5">{props.nft.symbol}</Label>
            <Label variant="span">{props.nft.description}</Label>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
    <ShareTwitterButton
      text={`Take a look at this awesome NFT!${lineBreakCode}${encode(
        props.nft.name
      )}${lineBreakCode}${lineBreakCode}Royalties: ${encode(
        `${formatRoyalties(props.nft.seller_fee_basis_points)}%`
      )}${lineBreakCode}${encode(`${solscanUrl}${props.nft.address}`)}${lineBreakCode}`}
      url={props.nft.external_url}
      hashtags="SolanaNFT, NFT, UbiquityAPI, UbiquityHackathon23"
    />
  </div>
);

const goToNftDetail = (nftData, onOpenNftDetail) => {
  // we will show a popup of the nft data
  onOpenNftDetail(nftData);
};
