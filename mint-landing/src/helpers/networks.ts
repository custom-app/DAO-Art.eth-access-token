import Moralis from 'moralis';

export const networkConfigs = {
  "0x1": {
    currencySymbol: "ETH",
    chainName: 'Ethereum',
    blockExplorerUrl: "https://etherscan.io/",
    wrapped: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  },
  "0x3": {
    currencySymbol: "ETH",
    chainName: 'Ethereum Ropsten',
    blockExplorerUrl: "https://ropsten.etherscan.io/",
  },
  "0x4": {
    currencySymbol: "ETH",
    chainName: 'Ethereum Rinkeby',
    blockExplorerUrl: "https://rinkeby.etherscan.io/",
  },
  "0x2a": {
    currencySymbol: "ETH",
    chainName: 'Ethereum Kovan',
    blockExplorerUrl: "https://kovan.etherscan.io/",
  },
  "0x5": {
    currencySymbol: "ETH",
    chainName: 'Ethereum Goerli',
    blockExplorerUrl: "https://goerli.etherscan.io/",
  },
  "0x539": {
    chainName: "Local Chain",
    currencyName: "ETH",
    currencySymbol: "ETH",
    rpcUrl: "http://127.0.0.1:7545",
  },
  "0xa86a": {
    chainId: 43114,
    chainName: "Avalanche Mainnet",
    currencyName: "AVAX",
    currencySymbol: "AVAX",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    blockExplorerUrl: "https://cchain.explorer.avax.network/",
  },
  "0x38": {
    chainId: 56,
    chainName: "Smart Chain",
    currencyName: "BNB",
    currencySymbol: "BNB",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    blockExplorerUrl: "https://bscscan.com/",
    wrapped: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  "0x61": {
    chainId: 97,
    chainName: "Smart Chain - Testnet",
    currencyName: "BNB",
    currencySymbol: "BNB",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    blockExplorerUrl: "https://testnet.bscscan.com/",
  },
  "0x89": {
    chainId: 137,
    chainName: "Polygon Mainnet",
    currencyName: "MATIC",
    currencySymbol: "MATIC",
    rpcUrl: "https://rpc-mainnet.maticvigil.com/",
    blockExplorerUrl: "https://explorer-mainnet.maticvigil.com/",
    wrapped: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
  },
  "0x13881": {
    chainId: 80001,
    chainName: "Polygon Mumbai",
    currencyName: "MATIC",
    currencySymbol: "MATIC",
    rpcUrl: "https://matic-mumbai.chainstacklabs.com",
    blockExplorerUrl: "https://mumbai.polygonscan.com/",
  },
};

export const MetamaskDefaultChains: ChainIdHex[] = ['0x1', '0x3', '0x4', '0x2a', '0x5']

export type ChainIdHex = keyof typeof networkConfigs;

export const defaultChainId: ChainIdHex = process.env.REACT_APP_CHAIN_ID as ChainIdHex;
export const defaultConfig = networkConfigs[defaultChainId]

export const getNativeByChain = (chain: ChainIdHex) =>
  networkConfigs[chain]?.currencySymbol || "NATIVE";

export const getChainById = (chain: ChainIdHex) => (networkConfigs[chain] as any)?.chainId || null;

export const getExplorer = (chain: ChainIdHex) => (networkConfigs[chain] as any)?.blockExplorerUrl;

export const getWrappedNative = (chain: ChainIdHex) =>
  (networkConfigs[chain] as any)?.wrapped || null;

export async function changeNetwork(provider: Moralis.MoralisWeb3Provider, chainId: ChainIdHex): Promise<any> {
  return provider.send(
    'wallet_switchEthereumChain',
    [{chainId}]
  )
}

interface AddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export async function addNetworkByChainId(provider: Moralis.MoralisWeb3Provider, chainId: ChainIdHex): Promise<any> {
  const config = networkConfigs[chainId] as any; // sorry, no time for proper types
  return addNetwork(provider, {
    chainId,
    chainName: config.chainName,
    nativeCurrency: {
      name: config.currencyName,
      symbol: config.currencySymbol || config.currencyName,
      decimals: 18,
    },
    rpcUrls: [config.rpcUrl],
    blockExplorerUrls: [config.blockExplorerUrl],
  })
}

export function addNetwork(provider: Moralis.MoralisWeb3Provider, param: AddEthereumChainParameter): Promise<any> {
  return provider.send(
    'wallet_addEthereumChain',
    [param]
  )
}

export async function changeAndAddNetwork(provider: Moralis.MoralisWeb3Provider, chainId: ChainIdHex): Promise<any> {
  try {
    return await changeNetwork(provider, chainId)
  } catch (e: any) {
    if (e?.code === 4902) {
      return await addNetworkByChainId(provider, chainId)
    } else {
      throw e
    }
  }
}
