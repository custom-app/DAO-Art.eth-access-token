import {Box} from '@mui/material';
import LargeAndSmall from '../../components/data-display/large-and-small';
import {PropsWithChildren, useEffect} from 'react';
import {useApiContract} from 'react-moralis';
import daoAbi from '../../contracts/DaoArtAccessToken.json';
import {defaultChainId} from '../../helpers/networks';
import {BigNumber} from 'ethers'
import CurrencyEth from '../../components/data-display/currency-eth';

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

const contract = process.env.REACT_APP_CONTRACT

export default function TripleText(): JSX.Element | null {
  console.log('address', contract);
  const {runContractFunction, data} = useApiContract({
    functionName: 'getTokenParams',
    address: contract,
    abi: daoAbi.abi,
    chain: defaultChainId as any,
  })
  useEffect(() => {
    runContractFunction().then() // then() to prevent warning
    // eslint-disable-next-line
  }, [])
  if (data) {
    const {
      _startPrice,
      _step,
      _stepValue,
      _totalSupply,
      _currentSupply
    } = data as any;
    const startPrice = BigNumber.from(_startPrice);
    const step = BigNumber.from(_step);
    const stepValue = BigNumber.from(_stepValue);
    const totalSupply = BigNumber.from(_totalSupply);
    const currentSupply = BigNumber.from(_currentSupply);
    const currentPrice = startPrice.add(stepValue.mul(currentSupply.div(step)))
    let nextStepSupply = currentSupply.add(step)
    if (nextStepSupply.gt(totalSupply)) {
      nextStepSupply = totalSupply
    }
    const nextPrice = startPrice.add(stepValue.mul(nextStepSupply.div(step)))
    return (
      <>
        <Line>
          <LargeAndSmall
            large={<CurrencyEth wei={currentPrice}/>}
            small={'Current price'}
          />
          <LargeAndSmall
            large={<CurrencyEth wei={nextPrice}/>}
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
