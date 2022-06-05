import {Button} from '@mui/material';
import {useAuthModalContext} from '../Account/auth-modal-context';
import {useMoralis} from 'react-moralis';
import {useCallback, useState} from 'react';
import {defaultChainId} from '../../../helpers/networks';
import {mint, MintResult} from '../../../helpers/dao-contract';
import MintResultDialog from '../mint-result-dialog';

export const height = 70
const pad = 6
const fontSize = '1.2rem'

export default function MintButton(): JSX.Element {
  const {setIsAuthModalVisible} = useAuthModalContext()
  const {account, chainId, web3} = useMoralis()
  const [resultDialogOpen, setResultDialogOpen] = useState(false)
  const [mintResult, setMintResult] = useState<MintResult>()
  const onMint = useCallback(async () => {
    if (web3) {
      try {
        setResultDialogOpen(true)
        if (!mintResult?.success) {
          // min again only if previous mint was unsuccessful
          const result = await mint(web3)
          console.log('mint result', result)
          setMintResult(result)
        }
      } catch (e: any) {
        console.error(e);
      }
    }
  }, [account, web3, mintResult, setResultDialogOpen, setMintResult])
  return (
    <>
      <Button
        type="button"
        variant={account ? 'contained' : 'outlined'}
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
        onClick={() => account ? onMint() : setIsAuthModalVisible(true)}
        disabled={Boolean(account && chainId !== defaultChainId)}
      >
        {
          account
            ? (<span>Mint NFT</span>)
            : (<span>Connect wallet</span>)
        }
      </Button>
      <MintResultDialog
        open={resultDialogOpen}
        onClose={() => {
          setResultDialogOpen(false)
          if (!mintResult?.success) {
            // allow user to try again if minting was unsuccessful
            setMintResult(undefined)
          }
        }}
        result={mintResult}
      />
    </>
  )
}
