import { Typography } from "@mui/material";

export const Title = ({ children, variant = "h3" }) => (
    <Typography variant={variant} className="title">{children}</Typography>
);