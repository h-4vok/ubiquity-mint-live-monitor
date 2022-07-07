import { Typography } from "@mui/material";

export const Label = ({ children, variant = "p" }) => (
    <Typography variant={variant} className="label">{children}</Typography>
);