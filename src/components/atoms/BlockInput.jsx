import { TextField } from "@mui/material";

export const BlockInput = ({ label, placeholder, onChange, blockNumber }) => (
  <TextField
    id="outlined-number"
    sx={{ width: "100%" }}
    label={label}
    type="number"
    placeholder={placeholder}
    value={blockNumber}
    onChange={onChange}
    InputLabelProps={{
      shrink: true,
    }}
  />
);
