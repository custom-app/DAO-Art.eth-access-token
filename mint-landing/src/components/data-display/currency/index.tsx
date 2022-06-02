import React from 'react'

const usdDecimals = 100;

export interface CurrencyProps {
  cents: number,
  currency?: string,
}

export default function Currency({cents, currency = 'USD'}: CurrencyProps): JSX.Element {
  const locale = 'en'
  return (
    <>
      {
        (cents / usdDecimals)
          .toLocaleString(
            locale,
            {
              style: 'currency',
              currency
            }
          )
      }
    </>
  )
}
