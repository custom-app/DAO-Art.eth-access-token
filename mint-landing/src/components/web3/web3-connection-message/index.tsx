import {useMoralis} from 'react-moralis';
import {changeAndAddNetwork, defaultChainId, networkConfigs} from '../../../helpers/networks';
import {Button} from '@mui/material';
import {useCallback, useState} from 'react';
import Moralis from 'moralis';
import {supportsNetworkChange} from '../Account/config';
import ErrorDisplay from '../../data-display/error-display';

export default function Web3ConnectionMessage(): JSX.Element | null {
  const {account, chainId, connectorType} = useMoralis();
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
  const changeMsg = `Change network to ${defaultConfig.chainName}`;
  if (account && chainId !== defaultChainId) {
    if (!connectorType || !supportsNetworkChange(connectorType)) {
      return (
        <ErrorDisplay
          noMargin
          error={changeMsg}
        />
      )
    }
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
            : changeMsg
        }
      </Button>
    )
  }
  return null
}
