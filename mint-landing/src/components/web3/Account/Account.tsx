import {useMoralis} from "react-moralis";
import {getEllipsisTxt} from "../../../helpers/formatters";
import Blockie from "../Blockie";
import {Box, Button, Card, Dialog, DialogContent, Typography} from "@mui/material";
import {useCallback, useState} from "react";
import Address from "../Address/Address";
import {SelectOutlined} from "@ant-design/icons";
import {
  ChainIdHex, changeAndAddNetwork,
  defaultChainId,
  getExplorer,
} from "../../../helpers/networks";
import {connectors} from "./config";
import {FullDialogTitle} from '../../dialog/full-dialog-title';
import Moralis from 'moralis';
import {useAuthModalContext} from './auth-modal-context';

function Account() {
  const {isAuthModalVisible, setIsAuthModalVisible} = useAuthModalContext()
  const {authenticate, isAuthenticated, account, chainId, logout} =
    useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onAuthClose = useCallback(
    () => setIsAuthModalVisible(false),
    [setIsAuthModalVisible]
  )
  const onAccountClose = useCallback(
    () => setIsModalVisible(false),
    [setIsModalVisible]
  )

  if (!isAuthenticated || !account) {
    return (
      <>
        <Button
          type="button"
          variant="outlined"
          onClick={() => setIsAuthModalVisible(true)}
        >
          Authenticate
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
              padding: 2,
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
                      const chainId = Number.parseInt(defaultChainId, 16);
                      console.log('chainId', chainId);
                      await authenticate({
                        provider: (connectorId as Moralis.Web3ProviderType),
                        anyNetwork: false,
                      });
                      window.localStorage.setItem("connectorId", connectorId);
                      setIsAuthModalVisible(false);
                      const web3Provider = await Moralis.enableWeb3();
                      await changeAndAddNetwork(web3Provider, defaultChainId)
                    } catch (e) {
                      console.error(e);
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
        <Blockie currentWallet scale={3}/>
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
            <Address
              avatar="left"
              size={6}
              copyable
              style={{fontSize: "20px"}}
            />
            <div style={{marginTop: "10px", padding: "0 10px"}}>
              <a
                href={`${getExplorer(chainId as ChainIdHex)}/address/${account}`}
                target="_blank"
                rel="noreferrer"
              >
                <SelectOutlined style={{marginRight: "5px"}}/>
                View on Explorer
              </a>
            </div>
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
