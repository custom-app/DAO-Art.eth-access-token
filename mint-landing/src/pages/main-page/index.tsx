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
        height: '100%',
      }}
    >
      <Box
        sx={{marginBottom: 10}}
      >
        <Headline/>
      </Box>
      <TripleText/>
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <MintButton/>
      </Box>
    </Box>
  )
}
