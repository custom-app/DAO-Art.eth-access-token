import {Button} from '@mui/material';
import {useAuthModalContext} from '../Account/auth-modal-context';
import {useMoralis} from 'react-moralis';
import {useCallback} from 'react';
import {defaultChainId} from '../../../helpers/networks';

const height = 70
const pad = 6
const fontSize = '1.2rem'

export default function MintButton(): JSX.Element {
  const {setIsAuthModalVisible} = useAuthModalContext()
  const {account, chainId} = useMoralis()
  const mint = useCallback(() => {
    console.log('mint', account)
  }, [account])
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
      onClick={() => account ? mint() : setIsAuthModalVisible(true)}
      disabled={Boolean(account && chainId !== defaultChainId)}
    >
      {
        account
          ? (<span>Mint NFT</span>)
          : (<span>Connect wallet</span>)
      }
    </Button>
  )
}
