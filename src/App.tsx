import { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
//  the TezosToolkit which contains the functionality of the Taquito library
import "./App.css";
import ConnectButton from "./components/ConnectWallet";
//,handle connecting to the user's wallet and reading out the state we need
import DisconnectButton from "./components/DisconnectWallet";
import qrcode from "qrcode-generator";
import UpdateContract from "./components/UpdateContract";
// UpdateContract will handle the user’s interactions with the contract
import Transfers from "./components/Transfers";
import DisconnectedUser from "./components/DisconnectedUser";
import Nav from "./components/common/Nav";
// Transfers will handle the functionality of making a transaction.

enum BeaconConnection {
  NONE = "",
  LISTENING = "Listening to P2P channel",
  CONNECTED = "Channel connected",
  PERMISSION_REQUEST_SENT = "Permission request sent, waiting for response",
  PERMISSION_REQUEST_SUCCESS = "Wallet is connected"
}

const App = () => {
  const [Tezos, setTezos] = useState<TezosToolkit>(
    new TezosToolkit("https://api.tez.ie/rpc/granadanet")
  );
  const [contract, setContract] = useState<any>(undefined);
  const [publicToken, setPublicToken] = useState<string | null>("");
  const [wallet, setWallet] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [storage, setStorage] = useState<number>(0);
  const [copiedPublicToken, setCopiedPublicToken] = useState<boolean>(false);
  const [beaconConnection, setBeaconConnection] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("transfer");

  // Granadanet Increment/Decrement contract
  const contractAddress: string = "KT1X9o1MAVFDEiiz2AycaAQFKFSBAxwp17Ru";


  const generateQrCode = (): { __html: string } => {
    const qr = qrcode(0, "L");
    qr.addData(publicToken || "");
    qr.make();

    return { __html: qr.createImgTag(4) };
  };
  //console.log({contract})
  //console.log({wallet})
  //console.log({userAddress})
  //console.log({userBalance})
  //console.log({storage})
  //console.log({copiedPublicToken})
  //console.log({beaconConnection})
  //console.log({activeTab})
  //console.log({publicToken})

  if (publicToken && (!userAddress || isNaN(userBalance))) {
    return (
      <div className="main-box">
        <h1>Taquito Boilerplate</h1>
        <div id="dialog">
          <header>Try the Taquito Boilerplate App!</header>
          <div id="content">
            <p className="text-align-center">
              <i className="fas fa-broadcast-tower"></i>&nbsp; Connecting to
              your wallet
            </p>
            <div
              dangerouslySetInnerHTML={generateQrCode()}
              className="text-align-center"
            ></div>
            <p id="public-token">
              {copiedPublicToken ? (
                <span id="public-token-copy__copied">
                  <i className="far fa-thumbs-up"></i>
                </span>
              ) : (
                <span
                  id="public-token-copy"
                  onClick={() => {
                    if (publicToken) {
                      navigator.clipboard.writeText(publicToken);
                      setCopiedPublicToken(true);
                      setTimeout(() => setCopiedPublicToken(false), 2000);
                    }
                  }}
                >
                  <i className="far fa-copy"></i>
                </span>
              )}

              <span>
                Public token: <span>{publicToken}</span>
              </span>
            </p>
            <p className="text-align-center">
              Status: {beaconConnection ? "Connected" : "Disconnected"}
            </p>
          </div>
        </div>

      </div>
    );
  } else if (userAddress && !isNaN(userBalance)) {
    return (
      <>
      <Nav>
      <DisconnectButton
            wallet={wallet}
            setPublicToken={setPublicToken}
            setUserAddress={setUserAddress}
            setUserBalance={setUserBalance}
            setWallet={setWallet}
            setTezos={setTezos}
            setBeaconConnection={setBeaconConnection}
          />
      </Nav>
      storage : {JSON.stringify(storage,null,2)}
      <div className="main-box">
        <div id="tabs">
        </div>
            <p>
            contract address
              <a
                href={`https://better-call.dev/granadanet/${contractAddress}/operations`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contractAddress}
              </a>
            </p>
            <p>
              userAddress {userAddress}
            </p>
            <p>
              balance : {(userBalance / 1000000).toLocaleString("en-US")} ꜩ
            </p>
          </div>
      </>
    )
  } else if (!publicToken && !userAddress && !userBalance) {
    // disconnected
    return (
      <>
      <Nav>
      <ConnectButton
            Tezos={Tezos}
            setContract={setContract}
            setPublicToken={setPublicToken}
            setWallet={setWallet}
            setUserAddress={setUserAddress}
            setUserBalance={setUserBalance}
            setStorage={setStorage}
            contractAddress={contractAddress}
            setBeaconConnection={setBeaconConnection}
            wallet={wallet}
          />
        </Nav>

      </>
    )
    
  } else {
    return <div>An error has occurred</div>;
  }
};

export default App;
