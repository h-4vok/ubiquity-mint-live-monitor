import { Button } from "@mui/material"
import TwitterIcon from '@mui/icons-material/Twitter'
import { shareTwitterURL } from 'share-twitter'

export const ShareTwitterButton = (props) => (
  <Button
    variant="contained"
    className="stretched-button"
    target="_blank"
    endIcon={<TwitterIcon />}
    href={shareTwitterURL({
        text: props.text,
        url: props.url,
        hashtags: props.hashtags
    })}
  >
    SHARE!
  </Button>
);