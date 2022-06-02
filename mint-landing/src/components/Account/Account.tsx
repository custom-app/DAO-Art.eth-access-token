import {useMoralis} from "react-moralis";
import {getEllipsisTxt} from "../../helpers/formatters";
import Blockie from "../Blockie";
import {Box, Button, Card, Dialog, DialogContent, Typography} from "@mui/material";
import {useCallback, useState} from "react";
import Address from "../Address/Address";
import {SelectOutlined} from "@ant-design/icons";
import {
  addNetworkByChainId,
  ChainIdHex,
  changeNetwork,
  defaultChainId,
  getExplorer,
} from "../../helpers/networks";
import {connectors} from "./config";
import {FullDialogTitle} from '../dialog/full-dialog-title';
import Moralis from 'moralis';

const styles = {
  account: {},
  text: {
    color: "#21BF96",
  },
};

export interface AccountProps {
  isAuthModalVisible: boolean,
  setIsAuthModalVisible: (v: boolean) => void,
}

function Account(
  {
    isAuthModalVisible,
    setIsAuthModalVisible
  }: AccountProps
) {
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
        <div onClick={() => setIsAuthModalVisible(true)}>
          <p style={styles.text}>Authenticate</p>
        </div>
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
                      try {
                        await changeNetwork(web3Provider, defaultChainId)
                      } catch (e: any) {
                        if (e?.code === 4902) {
                          await addNetworkByChainId(web3Provider, defaultChainId)
                        }
                      }
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
      <Box
        sx={{
          height: "42px",
          padding: "0 15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "fit-content",
          borderRadius: "12px",
          backgroundColor: "rgb(244, 244, 244)",
          cursor: "pointer",
        }}
        onClick={() => setIsModalVisible(true)}
      >
        <p style={{marginRight: "5px", ...styles.text}}>
          {getEllipsisTxt(account, 6)}
        </p>
        <Blockie currentWallet scale={3}/>
      </Box>
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
