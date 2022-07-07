import * as React from "react";
import { Grid, Paper, Modal } from "@mui/material";
import { Label } from "../atoms";

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
                src="https://www.arweave.net/oiY7orCWNjVt8HkSgZKt2zql7LcsOpoo5W8W_fjKmIg?ext=png"
                alt=""
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Label variant="h6">NFT Name</Label>
          </Grid>
          <Grid item xs={12}>
            <Label variant="span">external url</Label>
          </Grid>
          <Grid item xs={12}>
            <Label variant="span">seller basis fee</Label>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={24}>
              <Grid container>
                <Grid item xs={4}>
                  <Label>attr</Label>
                </Grid>
                <Grid item xs={8}>
                  <Label>value</Label>
                </Grid>
                <Grid item xs={4}>
                  <Label>attr</Label>
                </Grid>
                <Grid item xs={8}>
                  <Label>value</Label>
                </Grid>
                <Grid item xs={4}>
                  <Label>attr</Label>
                </Grid>
                <Grid item xs={8}>
                  <Label>value</Label>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}
