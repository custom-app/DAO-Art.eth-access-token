import {useMoralis} from 'react-moralis';
import {changeAndAddNetwork, defaultChainId, networkConfigs} from '../../../helpers/networks';
import {Button} from '@mui/material';
import {useCallback, useState} from 'react';
import Moralis from 'moralis';

export default function Web3ConnectionMessage(): JSX.Element | null {
  const {account, chainId} = useMoralis();
  const defaultConfig = networkConfigs[defaultChainId]
  const [tried, setTried] = useState(false)
  const changeNetwork = useCallback(async () => {
    try {
      const web3Provider = await Moralis.enableWeb3();
      await changeAndAddNetwork(web3Provider, defaultChainId)
    } catch (e) {
      console.error(e);
      setTried(true);
    }
  }, [setTried])
  if (account && chainId !== defaultChainId) {
    return (
      <Button
        type="button"
        onClick={changeNetwork}
        variant="contained"
        color="error"
      >
        {
          tried
            ? 'Try again'
            : `Change network to ${defaultConfig.chainName}`
        }
      </Button>
    )
  }
  return null
}
