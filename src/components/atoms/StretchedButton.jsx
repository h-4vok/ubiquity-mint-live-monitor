import { Button } from "@mui/material";

export const StretchedButton = ({ children, endIcon, onClick }) => (
  <Button
    className="stretched-button"
    variant="contained"
    endIcon={endIcon}
    onClick={onClick}
  >
    {children}
  </Button>
);
