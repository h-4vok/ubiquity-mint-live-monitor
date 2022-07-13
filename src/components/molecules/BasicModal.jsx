import * as React from "react";
import { Grid, Paper, Modal, Link } from "@mui/material";
import { Label, ShareTwitterButton } from "../atoms";
import { solscanUrl, solscanLinkToAccount, lineBreakCode } from "../../lib/constants";
import { formatRoyalties } from "../../lib/formatting/numberFormat";
const { encode } = require("url-encode-decode");

const containerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  maxWidth: "600px",
  p: 4,
  "box-shadow": "none !important",
  "-webkit-transition": "none !important",
  transition: "none !important",
};

export function BasicModal({ open, setOpen, nftData }) {
  const handleClose = () => setOpen(false);
  const ownerAddress = nftData && nftData.ownerData && nftData.ownerData.owner;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper sx={containerStyle} elevation={4} className="nft-show">
        <Grid container className="text-align--center">
          <Grid item xs={12}>
            <div className="gradient-shadow">
              <Link
                href={`${solscanUrl}${nftData.address}`}
                target="_blank"
                underline="none"
              >
                <img
                  className="fungible-token-preview"
                  src={nftData.image}
                  alt={nftData.name}
                />
              </Link>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Label variant="h6">
              <Link
                href={`${solscanUrl}${nftData.address}`}
                target="_blank"
                underline="none"
              >
                {nftData.name}
              </Link>
            </Label>
          </Grid>
          <Grid item xs={12}>
            <Link
              href={`${solscanLinkToAccount}${ownerAddress}`}
              target="_blank"
            >
              <div className="text-overflow--ellipsis content-text">{`Owner: ${ownerAddress}`}</div>
            </Link>
          </Grid>

          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid item xs={12}>
            <Link href={nftData.external_url} target="_blank">
              <Label variant="span">{nftData.external_url}</Label>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Label variant="p">{nftData.description}</Label>
          </Grid>
          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid item xs={12}>
            <Label variant="span">
              Royalties:{" "}
              {`${formatRoyalties(nftData.seller_fee_basis_points)}%`}
            </Label>
          </Grid>
          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={24} className="nft-show nft-show-table">
              <Grid container>
                <Grid item xs={4} className="border-bottom--border-color">
                  <Label>Attribute</Label>
                </Grid>
                <Grid item xs={8} className="border-bottom--border-color">
                  <Label>Value</Label>
                </Grid>
                <Grid item xs={4}>
                  &nbsp;
                </Grid>
                <Grid item xs={8}>
                  &nbsp;
                </Grid>
                {nftData.attributes &&
                  nftData.attributes.map((attribute, index) => (
                    <React.Fragment key={`ATTRIBUTE_${index}`}>
                      <Grid item xs={4}>
                        <Label>{attribute.trait_type}</Label>
                      </Grid>
                      <Grid item xs={8}>
                        <Label>{attribute.value}</Label>
                      </Grid>
                    </React.Fragment>
                  ))}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <ShareTwitterButton
              text={`Take a look at this awesome NFT!${lineBreakCode}${encode(
                nftData.name
              )}${lineBreakCode}${lineBreakCode}Royalties: ${encode(
                `${formatRoyalties(nftData.seller_fee_basis_points)}%`
              )}${lineBreakCode}${encode(
                `${solscanUrl}${nftData.address}`
              )}${lineBreakCode}`}
              url={nftData.external_url}
              hashtags="SolanaNFT, NFT, UbiquityAPI, UbiquityHackathon23"
            />
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}
