import {Button} from '@mui/material';

const height = 70
const pad = 6
const fontSize = '1.2rem'

export default function MintButton(): JSX.Element {
  return (
    <Button
      type="button"
      variant="contained"
      sx={{
        height,
        paddingLeft: pad,
        paddingRight: pad,
        fontSize,
        border: 2,
        '&:touched': {
          border: 2,
        },
        '&:active': {
          border: 2,
        },
        '&:focus': {
          border: 2,
        },
        '&:target': {
          border: 2,
        },
        '&:hover': {
          border: 2,
        },
        '&:visited': {
          border: 2,
        }
      }}
    >
      Mint NFT
    </Button>
  )
}
