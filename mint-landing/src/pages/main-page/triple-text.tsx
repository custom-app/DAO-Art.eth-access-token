import {Box} from '@mui/material';
import LargeAndSmall from '../../components/data-display/large-and-small';
import {PropsWithChildren, useEffect} from 'react';
import {useApiContract} from 'react-moralis';
import daoAbi from '../../contracts/DaoArtAccessToken.json';
import {defaultChainId} from '../../helpers/networks';
import CurrencyEth from '../../components/data-display/currency-eth';
import {calcTokenParams, daoContractAddress} from '../../helpers/dao-contract';
import ErrorDisplay from '../../components/data-display/error-display';
import {stringifyError} from '../../helpers/error';

function Line({children}: PropsWithChildren<{}>): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: {
          xs: 4,
          md: 8,
        },
        marginBottom: {
          xs: 2,
          md: 3,
        },
      }}
    >
      {children}
    </Box>
  )
}

export default function TripleText(): JSX.Element | null {
  const {runContractFunction, data, error} = useApiContract({
    functionName: 'getTokenParams',
    address: daoContractAddress,
    abi: daoAbi.abi,
    chain: defaultChainId as any,
  })
  useEffect(() => {
    console.log('run getTokenParams contract function')
    runContractFunction().then() // then() to prevent warning
    // eslint-disable-next-line
  }, [])
  if (data) {
    const {currentPrice, nextStepPrice, currentSupply, totalSupply} = calcTokenParams(data)
    return (
      <>
        <ErrorDisplay
          error={error && stringifyError(error)}
        />
        <Line>
          <LargeAndSmall
            large={<CurrencyEth wei={currentPrice}/>}
            small={'Current price'}
          />
          <LargeAndSmall
            large={<CurrencyEth wei={nextStepPrice}/>}
            small={'Next price'}
          />
        </Line>
        <Line>
          <LargeAndSmall
            large={`${currentSupply}/${totalSupply}`}
            small={'Tokens sold'}
          />
        </Line>
      </>
    )
  }
  return null
}
