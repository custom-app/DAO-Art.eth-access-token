import {Box} from '@mui/material';
import SaleParams from './sale-params';
import Headline from './headline';
import NftBalance from '../../components/web3/nft-balance';

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
            xs: 4,
            md: 8,
          }
        }}
      >
        <Headline/>
      </Box>
      <SaleParams/>
      <Box
        sx={{
          marginTop: {
            xs: 3,
            md: 6,
          },
        }}
      >
        <NftBalance/>
      </Box>
    </Box>
  )
}
