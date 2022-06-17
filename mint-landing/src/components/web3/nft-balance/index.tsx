import {useMoralis, useNFTBalances} from 'react-moralis';
import {daoContractAddress} from '../../../helpers/dao-contract';
import {utils} from 'ethers'
import {Box, CircularProgress} from '@mui/material';
import MintButton, {height as minButtonHeight} from '../mint-button';
import {useVerifyMetadata} from '../../../hooks/useVerifyMetadata';
import NftCard, {NFTItemType} from '../nft-card';

export default function NftBalance(): JSX.Element {
  const {account} = useMoralis()
  const {data: nftBalances} = useNFTBalances();
  // const [triedToFetch, setTriedToFetch] = useState(false)
  const loading = !nftBalances?.result
  const {verifyMetadata} = useVerifyMetadata()
  let nft = nftBalances
    ?.result
    ?.find(item =>
      utils.getAddress(item.token_address) === utils.getAddress(daoContractAddress as string)
    )
  if (account && loading) {
    return (
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: minButtonHeight,
        }}
      >
        <CircularProgress/>
      </Box>
    )
  }
  if (account && nft) {
    nft = verifyMetadata(nft)
    if (nft) {
      return (
        <>
          <Box
            sx={{
              typography: 'h5',
              marginBottom: 2,
            }}
          >
            You have:
          </Box>
          <NftCard
            nft={nft as NFTItemType}
          />
        </>
      )
    }
  }
  return (
    <MintButton/>
  )
}
