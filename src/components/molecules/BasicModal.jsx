import * as React from "react";
import { Grid, Paper, Modal, Link } from "@mui/material";
import { Label } from "../atoms";
import { solscanUrl } from "../../lib/constants"

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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper sx={containerStyle} elevation={4}>
        <Grid container className="text-align--center">
          <Grid item xs={12}>
            <div className="gradient-shadow">
              <img
                className="fungible-token-preview"
                src={nftData.image}
                alt={nftData.name}
              />
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
            <Link href={nftData.external_url} target="_blank">
              <Label variant="span">{nftData.external_url}</Label>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Label variant="p">{nftData.description}</Label>
          </Grid>
          <Grid item xs={12}>
            <Label variant="span">Seller fee: {nftData.seller_fee_basis_points}</Label>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={24}>
              <Grid container>
                {
                  nftData.attributes && 
                  nftData.attributes.map((attribute, index) =>
                    <React.Fragment key={`ATTRIBUTE_${index}`}>
                      <Grid item xs={4}>
                        <Label>{attribute.trait_type}</Label>
                      </Grid>
                      <Grid item xs={8}>
                        <Label>{attribute.value}</Label>
                      </Grid>
                    </React.Fragment>
                  )
                }
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}
