import {Button} from '@mui/material';

const height = 64

export default function MintButton(): JSX.Element {
  return (
    <Button
      type="button"
      variant="outlined"
      sx={{
        height,
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      Mint NFT
    </Button>
  )
}
