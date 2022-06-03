import {Box} from '@mui/material';
import TripleText from './triple-text';
import MintButton from '../../components/web3/mint-button';
import Headline from './headline';

export default function MainPage(): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      <Box
        sx={{
          marginBottom: {
            xs: 5,
            md: 10,
          }
        }}
      >
        <Headline/>
      </Box>
      <TripleText/>
      <Box
        sx={{
          marginTop: {
            xs: 4,
            md: 8,
          },
        }}
      >
        <MintButton/>
      </Box>
    </Box>
  )
}
