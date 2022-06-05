import Address from '../Address/Address';
import {ChainIdHex, getExplorer} from '../../../helpers/networks';
import {SelectOutlined} from '@ant-design/icons';
import {useMoralis} from 'react-moralis';

export interface AddressWithExplorerProps {
  address: string,
  isTx?: boolean,
  avatar?: 'left' | 'right'
}

export default function AddressWithExplorer({address, isTx, avatar}: AddressWithExplorerProps): JSX.Element {
  const {chainId} = useMoralis()
  return (
    <>
      <Address
        avatar={avatar}
        address={address}
        size={6}
        copyable
        style={{fontSize: "20px"}}
      />
      <div style={{marginTop: "10px", padding: "0 10px"}}>
        <a
          href={`${getExplorer(chainId as ChainIdHex)}${isTx ? 'tx' : 'address'}/${address}`}
          target="_blank"
          rel="noreferrer"
        >
          <SelectOutlined style={{marginRight: "5px"}}/>
          View on Explorer
        </a>
      </div>
    </>
  )
}
