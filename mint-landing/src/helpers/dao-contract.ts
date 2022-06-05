import metadata from './token-metadata.json'
import Moralis from 'moralis';
import {Transaction, Contract, BigNumber} from 'ethers'
import daoAbi from '../contracts/DaoArtAccessToken.json';

const contractAddr = process.env.REACT_APP_CONTRACT

export interface MintResultSuccess {
  success: true,
  tx: Transaction
}

export interface MintResultError {
  success: false,
  error: any,
}

export type MintResult = MintResultSuccess | MintResultError

export async function callContractMint(provider: Moralis.MoralisWeb3Provider, metaUri: string): Promise<MintResult> {
  if (!contractAddr) {
    return {
      success: false,
      error: 'No contract address. Message the support'
    }
  }
  try {
    const contract = new Contract(contractAddr, daoAbi.abi, provider.getSigner())
    const data = await contract.getTokenParams()
    const {currentSupply, currentPrice} = calcTokenParams(data)
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


export async function mint(provider: Moralis.MoralisWeb3Provider): Promise<MintResult> {
  const metadataFile = new Moralis.File('metadata.json', {
    base64: btoa(JSON.stringify(metadata))
  })
  const res = await metadataFile.saveIPFS({ipfs: true})
  const hash = (res as any).hash()
  const metaUri = `ipfs://${hash}` // res.ipfs() returns gateway url, not the ipfs uri
  return callContractMint(provider, metaUri);
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
  return {
    currentPrice,
    nextStepPrice,
    step,
    stepValue,
    totalSupply,
    currentSupply,
  }
}
