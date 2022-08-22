import {useMoralis} from "react-moralis";
import {getEllipsisTxt} from "../../../helpers/formatters";
import Blockie from "../Blockie";
import {Box, Button, Card, Dialog, DialogContent, Typography} from "@mui/material";
import {useCallback, useState} from "react";
import {
  changeAndAddNetwork,
  defaultChainId,
} from "../../../helpers/networks";
import {connectors} from "./config";
import {FullDialogTitle} from '../../dialog/full-dialog-title';
import Moralis from 'moralis';
import {useAuthModalContext} from './auth-modal-context';
import ErrorDisplay from '../../data-display/error-display';
import AddressWithExplorer from '../address-with-explorer';
import {stringifyError} from '../../../helpers/error';

const noEthereumProviderError = 'Error: Non ethereum enabled browser'
const userClosedModalError = 'Error: User closed modal'
const notFinishedError = 'Error: Cannot execute Moralis.enableWeb3(), as Moralis Moralis.enableWeb3() already has been called, but is not finished yet'

function Account() {
  const {isAuthModalVisible, setIsAuthModalVisible} = useAuthModalContext()
  const {account, logout} =
    useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState('');
  const onAuthClose = useCallback(
    () => setIsAuthModalVisible(false),
    [setIsAuthModalVisible]
  )
  const onAccountClose = useCallback(
    () => setIsModalVisible(false),
    [setIsModalVisible]
  )
  if (!account) {
    return (
      <>
        <Button
          type="button"
          variant="outlined"
          onClick={() => setIsAuthModalVisible(true)}
        >
          Connect wallet
        </Button>
        <Dialog
          open={isAuthModalVisible}
          onClose={onAuthClose}
        >
          <FullDialogTitle
            onClose={onAuthClose}
            buttonRight={24}
          >
            <Box
              sx={{
                paddingLeft: 2,
              }}
            >
              Connect Wallet
            </Box>
          </FullDialogTitle>
          <DialogContent
            sx={{
              width: 340,
              padding: {
                xs: 1,
                md: 2,
              },
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: "1fr 1fr"
              }}
            >
              {connectors.map(({title, icon, connectorId}, key) => (
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                    justifyContent: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    padding: "20px 5px",
                    cursor: "pointer",
                  }}
                  key={key}
                  onClick={async () => {
                    try {
                      setError('');
                      const chainId = Number.parseInt(defaultChainId, 16);
                      console.log('chainId', chainId);
                      const provider = (connectorId as Moralis.Web3ProviderType);
                      await Moralis.authenticate({
                        provider,
                      });
                      const web3Provider = await Moralis.enableWeb3({
                        provider,
                      })
                      window.localStorage.setItem("connectorId", connectorId);
                      setIsAuthModalVisible(false);
                      await changeAndAddNetwork(web3Provider, defaultChainId)
                    } catch (e: any) {
                      await logout();
                      window.localStorage.removeItem("connectorId");
                      const s = e + '';
                      if (s === noEthereumProviderError) {
                        setError('Please, install MetaMask or another wallet');
                      } else if (s === notFinishedError || e?.code === -32002) {
                        setError('Please, open the wallet');
                      } else if (
                        // this error is just ignored
                        s !== userClosedModalError
                      ) {
                        if (e?.message) {
                          setError(e.message)
                        } else {
                          setError(stringifyError(e))
                        }
                      }
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={icon}
                    alt={title}
                    sx={{
                      alignSelf: "center",
                      fill: "rgb(40, 13, 95)",
                      flexShrink: "0",
                      marginBottom: "8px",
                      height: "30px",
                    }}
                  />
                  <Typography
                    typography="body1"
                  >
                    {title}
                  </Typography>
                </Box>
              ))}
            </Box>
            <ErrorDisplay
              error={error}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      {/* <button
        onClick={async () => {
          try {
            console.log("change")
            await web3._provider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x38" }],
            });
            console.log("changed")
          } catch (e) {
            console.error(e);
          }
        }}
      >
        Hi
      </button> */}
      <Button
        type="button"
        sx={{
          height: "42px",
          paddingLeft: 2,
          paddingRight: 2,
        }}
        variant="outlined"
        onClick={() => setIsModalVisible(true)}
      >
        <Box component="p" sx={{marginRight: 1}}>
          {getEllipsisTxt(account, 6)}
        </Box>
        <Blockie address={account} scale={3}/>
      </Button>
      <Dialog
        open={isModalVisible}
        onClose={onAccountClose}
      >
        <FullDialogTitle onClose={onAccountClose}>
          Account
        </FullDialogTitle>
        <DialogContent
          sx={{
            width: 400,
            padding: 2,
          }}
        >
          <Card
            sx={{
              marginTop: 1,
              padding: 2,
            }}
          >
            <AddressWithExplorer
              avatar="left"
              address={account}
            />
          </Card>
          <Button
            sx={{
              width: "100%",
              marginTop: 1.5,
              borderRadius: "0.5rem",
            }}
            onClick={async () => {
              await logout();
              window.localStorage.removeItem("connectorId");
              setIsModalVisible(false);
            }}
            variant="outlined"
            color="primary"
          >
            Disconnect Wallet
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Account;
