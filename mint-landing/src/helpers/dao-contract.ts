import metadata from './token-metadata-front.json'
import Moralis from 'moralis';
import {Transaction, Contract, BigNumber} from 'ethers'
import daoAbi from '../contracts/DaoArtAccessToken.json';

export const daoContractAddress = process.env.REACT_APP_CONTRACT

export interface MintResultSuccess {
  success: true,
  tx: Transaction
}

export interface MintResultError {
  success: false,
  error: any,
}

export type MintResult = MintResultSuccess | MintResultError

type Metadata = typeof metadata

function prepareMetadata(metadataJson: Metadata, currentSupply: BigNumber): Metadata {
  currentSupply.toNumber().toString().padStart(4, '0')
  return {
    ...metadataJson,
    name: `${metadataJson.name} #${currentSupply.toNumber().toString().padStart(3, '0')}`
  }
}


export async function mint(provider: Moralis.MoralisWeb3Provider): Promise<MintResult> {

  if (!daoContractAddress) {
    return {
      success: false,
      error: 'No contract address. Message the support'
    }
  }
  try {
    const contract = new Contract(daoContractAddress, daoAbi.abi, provider.getSigner())
    const data = await contract.getTokenParams()
    const {currentSupply, currentPrice} = calcTokenParams(data)
    const metadataFile = new Moralis.File('metadata.json', {
      base64: btoa(JSON.stringify(prepareMetadata(metadata, currentSupply)))
    })
    const res = await metadataFile.saveIPFS({ipfs: true})
    const hash = (res as any).hash()
    const metaUri = `ipfs://${hash}` // res.ipfs() returns gateway url, not the ipfs uri
    const tx: Transaction = await contract.buyToken(
      currentSupply,
      metaUri,
      {value: currentPrice}
    )
    return {
      success: true,
      tx,
    }
  } catch (error: any) {
    return {
      success: false,
      error,
    }
  }
}

export function calcTokenParams(getParamsMethodCallResult: any) {
  const {
    _startPrice,
    _step,
    _stepValue,
    _totalSupply,
    _currentSupply
  } = getParamsMethodCallResult;
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
  const nextStepPrice = startPrice.add(stepValue.mul(nextStepSupply.div(step)))
  const stepRemainder = step.sub(currentSupply.mod(step))
  return {
    startPrice, // изначальная цена
    currentPrice, // текущая цена
    nextStepPrice, // цена следующего шага
    step, // токенов в шаге
    stepValue, // рост цены токена при переходе на следующий шаг
    totalSupply, // сколько всего будет токенов
    currentSupply, // сколько уже выпущено токенов
    stepRemainder, // количество токенов, которые еще можно купить по этой цене
  }
}
