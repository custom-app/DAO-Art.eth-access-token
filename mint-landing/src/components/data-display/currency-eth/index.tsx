import React from 'react';
import {BigNumber, utils} from 'ethers';
import {defaultConfig} from '../../../helpers/networks';

export interface CurrencyEthProps {
  wei: BigNumber,
}

export default function CurrencyEth({wei}: CurrencyEthProps): JSX.Element {
  return (
    <>
      {utils.formatEther(wei) + ' ' + defaultConfig.currencySymbol}
    </>
  )
}
