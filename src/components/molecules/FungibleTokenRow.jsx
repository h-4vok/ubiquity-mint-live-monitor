import { Stack, Container } from "@mui/material";
import { FungibleTokenThumbnail, Title, Label } from "../atoms";

export const FungibleTokenRow = (props) => (
  <Stack direction="row" spacing={2}>
    <FungibleTokenThumbnail imageSrc="https://www.arweave.net/oiY7orCWNjVt8HkSgZKt2zql7LcsOpoo5W8W_fjKmIg?ext=png" />
    <Container className="text-align--left">
      <Title variant="h4">NFT name</Title>
      <Label variant="h6">NFT uri</Label>
    </Container>
  </Stack>
);
