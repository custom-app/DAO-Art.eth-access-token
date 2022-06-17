import Address from '../Address/Address';
import {ChainIdHex, getExplorer} from '../../../helpers/networks';
import {useMoralis} from 'react-moralis';
import {OpenInNew} from '@mui/icons-material';
import {Box, Link} from '@mui/material';

export interface AddressWithExplorerProps {
  address: string,
  isTx?: boolean,
  avatar?: 'left' | 'right'
}

export default function AddressWithExplorer({address, isTx, avatar}: AddressWithExplorerProps): JSX.Element {
  const {chainId} = useMoralis()
  return (
    <>
      <Address
        avatar={avatar}
        address={address}
        size={6}
        copyable
        style={{fontSize: "20px"}}
      />
      <div style={{marginTop: "10px", padding: "0 10px"}}>
        <Link
          href={`${getExplorer(chainId as ChainIdHex)}${isTx ? 'tx' : 'address'}/${address}`}
          target="_blank"
          rel="noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <OpenInNew sx={{marginRight: 1}}/>
          <Box component="span">
            View on Explorer
          </Box>
        </Link>
      </div>
    </>
  )
}
