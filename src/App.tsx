import React, { useState, ReactElement, useEffect } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { MichelsonV1Expression } from "@taquito/rpc";
import { ValidationResult, validateContractAddress } from "@taquito/utils";
import ContractReviewForm from "./components/ContractReviewForm";
import ContractFetchForm from "./components/ContractFetchForm";
import ContractOriginationForm from "./components/ContractOriginationForm";
import ContractResultForm from "./components/ContractResultForm";
import SnackbarGroup from "./components/SnackbarGroup";
import LastOriginatedContract from "./components/LastOriginatedContract";
import WizardControls from "./components/WizardControls";
import Navbar from "./components/Navbar";
import Confetti from "./components/Confetti";
import ErrorBoundary from "react-error-boundary";
import { TezBridgeWallet } from "@taquito/tezbridge-wallet";
import georgeCloneyTitleImg from "./assets/george-cloney-title.png";
import builtWithTaquitoImg from "./assets/built-with-taquito.png";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { InitialState } from "./utils/initial-app-state";
import { HttpBackend } from "@taquito/http-utils";
import { RemoteSigner } from "@taquito/remote-signer";
import "./App.css";
import generateDefaultStorage from "./utils/generate-default-storage";
import { TEST_NETWORK } from "./utils/constants";
import requestBeaconPermissions from "./utils/request-beacon-permissions";
import { ThanosWallet } from "@thanos-wallet/dapp";
import { ThanosDAppNetwork } from "@thanos-wallet/dapp/src/types";

const App: React.FC = (): ReactElement => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");
  const [signer, setSigner] = useState<string>("");
  const [provider, setProvider] = useState<string>("");
  const [code, setCode] = useState<MichelsonV1Expression[]>([]);
  const [storage, setStorage] = useState<MichelsonV1Expression | string>();
  const [launchNetwork, setLaunchNetwork] = useState<string>(InitialState.LAUNCH_NETWORK);
  const [contractNetwork, setContractNetwork] = useState<string>(InitialState.CONTRACT_NETWORK);
  const [contractAddress, setContractAddress] = useState<string>(InitialState.CONTRACT_ADDRESS);
  const [txnAddress, setTxnAddress] = useState<string>("");
  const [lastOriginatedContract, setLastOriginatedContract] = useState<string>("");
  const [confettiShown, setConfettiShown] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Tezos, _] = useState(new TezosToolkit("https://api.tez.ie/rpc/mainnet"));

  useEffect(() => {
    // If new contract is deployed update localStorage and Last Originated Contract button
    if (txnAddress) {
      localStorage.setItem("lastLaunchedContract", `${txnAddress},${launchNetwork}`);
      setLastOriginatedContract(`${txnAddress},${launchNetwork}`);
    }
    // If there's no contract deployed yet check local storage to see if we have a past deployed one
    // If we do add the Last Originated Contract button below the wizard
    if (!txnAddress) {
      const lastLaunchedContract = localStorage.getItem("lastLaunchedContract") as string;
      setLastOriginatedContract(lastLaunchedContract);
    }
  }, [launchNetwork, txnAddress]);

  // Remove loading state if user clicks on Modal X or Done button for Beacon
  useEffect(() => {
    const onClick = (event: any) => {
      if (event.target.className === "beacon-modal__close__icon" || event.target.className === "beacon-modal__button") {
        setLoadingMessage("");
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  const handleError = (error: any): void => {
    // Remove current snackbar message
    setLoadingMessage("");
    if (error && error.status === 404) {
      setError(error.message + "\n This typically means the contract was not found on this network.");
    } else {
      setError(error?.message ?? error);
    }
    // Remove error after 5 seconds
    setTimeout(() => setError(""), 5000);
  };

  const resetGeorgeCloney = (): void => {
    // Set entire application back to initial state
    setCurrentStep(1);
    setLoadingMessage("");
    setError("");
    setSigner("");
    setProvider("");
    setCode([]);
    setStorage("");
    setLaunchNetwork(InitialState.LAUNCH_NETWORK);
    setContractNetwork(InitialState.CONTRACT_NETWORK);
    setContractAddress(InitialState.CONTRACT_ADDRESS);
    setTxnAddress("");
    setLastOriginatedContract("");
    setConfettiShown(false);
  };

  const handleLaunchNetworkChange = async (network: string): Promise<void> => {
    if (network !== "mainnet" && network !== TEST_NETWORK) {
      // Set custom node as provider
      await Tezos.setProvider({ rpc: network });
      setLaunchNetwork(network);
      return setProvider(network);
    }
    // Set provider and network to be used whenever signing txn or retrieving data
    setProvider(`https://api.tez.ie/rpc/${network}`);
    setLaunchNetwork(network);
  };

  const handleContractNetworkChange = async (network: string): Promise<void> => {
    if (network !== "mainnet" && network !== TEST_NETWORK) {
      // Set custom node as provider
      await Tezos.setProvider({ rpc: network });
      setProvider(network);
      return setContractNetwork(network);
    }
    // Make sure state on steps 2-4 is reset
    resetGeorgeCloney();
    // Set provider and network to be used whenever signing txn or retrieving data
    setProvider(`https://api.tez.ie/rpc/${network}`);
    setContractNetwork(network);
  };

  const handleContractCodeSubmit = async (): Promise<any> => {
    try {
      // Reset steps 2-4
      setCurrentStep(1);
      setSigner("");
      setProvider("");
      setCode([]);
      setStorage("");
      setError("");
      setLaunchNetwork("mainnet");
      setTxnAddress("");
      // Set loading state and snackbar
      setLoadingMessage("Loading contract code...");
      // Redundancy measure to make sure provider is set
      await Tezos.setProvider({
        rpc: provider.includes("http") ? provider : `https://api.tez.ie/rpc/${contractNetwork}`,
      });

      // Grab contracts code from the blockchain and add code to the editors
      const newContract = await Tezos.contract.at(contractAddress);

      setCode(newContract.script.code);
      setStorage(newContract.script.storage);
      setCurrentStep(2);
      setLoadingMessage("");
    } catch (error) {
      handleError(error);
    }
  };

  const setupSigner = async (signer: string): Promise<void> => {
    if (signer === "beacon") {
      const beaconWallet = new BeaconWallet({
        name: "George Cloney",
        eventHandlers: {
          BROADCAST_REQUEST_SENT: {
            handler: async (data) => {
              console.log("broadcast request:", data);
            },
          },
          // To enable your own wallet connection success message
          PERMISSION_REQUEST_SUCCESS: {
            // setting up the handler method will disable the default one
            handler: async (data) => {
              setLoadingMessage("Wallet connected!");
            },
          },
          // to enable your own transaction sent message
          OPERATION_REQUEST_SENT: {
            // setting up the handler method will disable the default one
            handler: async (data) => {
              setLoadingMessage("Operation successfully sent!");
            },
          },
          // to enable your own transaction success message
          OPERATION_REQUEST_SUCCESS: {
            // setting up the handler method will disable the default one
            handler: async (data) => {
              setLoadingMessage("Operation successful!");
              setTimeout(() => setLoadingMessage("Injecting contract..."), 1000);
            },
          },
          OPERATION_REQUEST_ERROR: {
            // setting up the handler method will disable the default one
            handler: async (data) => {
              setError("An error has occurred!");
            },
          },
        },
      });
      await beaconWallet.client.init();
      await beaconWallet.client.removeAllPeers();
      await requestBeaconPermissions(beaconWallet, launchNetwork);
      Tezos.setProvider({ wallet: beaconWallet });
    }
    if (signer === "ephemeral") {
      const httpClient = new HttpBackend();
      const { id, pkh } = await httpClient.createRequest({
        url: `https://api.tez.ie/keys/${TEST_NETWORK}/ephemeral`,
        method: "POST",
        headers: { Authorization: "Bearer taquito-example" },
      });
      const signer = new RemoteSigner(pkh, `https://api.tez.ie/keys/${TEST_NETWORK}/ephemeral/${id}/`, {
        headers: { Authorization: "Bearer taquito-example" },
      });
      await Tezos.setProvider({ signer });
    }
    if (signer === "tezbridge") {
      // Allow custom node users to set host
      if (provider.includes("http")) {
        const wallet = new TezBridgeWallet();
        await wallet.setHost(provider);
        return Tezos.setProvider({ wallet });
      }
      await Tezos.setProvider({ wallet: new TezBridgeWallet() });
    }
    if (signer === "thanos") {
      const wallet = new ThanosWallet("George Cloney");
      // Allow custom node users to set host
      if (provider.includes("http")) {
        await wallet.connect("sandbox");
      } else {
        await wallet.connect(launchNetwork as ThanosDAppNetwork);
      }
      await Tezos.setProvider({ wallet });
    }
  };

  const handleContractLaunchSubmit = async (): Promise<void> => {
    // Set snackbar
    setLoadingMessage("Launching contract...");

    const defaultStorage = await generateDefaultStorage(contractAddress, contractNetwork, Tezos);

    // Redundancy measure to make sure provider is set
    await Tezos.setProvider({
      config: { confirmationPollingIntervalSecond: 5 },
      rpc: provider.includes("http") ? provider : `https://api.tez.ie/rpc/${launchNetwork}`,
    });

    await Tezos.wallet
      .originate({
        code: code as MichelsonV1Expression[],
        storage: defaultStorage.msg as MichelsonV1Expression,
      })
      .send()
      .then((originationOp) => {
        return originationOp.contract();
      })
      .then((contract) => {
        // Add block explorer snackbar message
        setLoadingMessage("");
        setTxnAddress(contract.address);
        setCurrentStep(4);
      })
      .catch(async (error) => {
        setLoadingMessage("");
        setSigner("");

        if (error && error.status === 404) {
          setError(error.message + "\n This typically means the contract was not found on this network.");
        } else {
          console.log(error);
          setError(error?.message ?? error);
        }
      });
  };

  const updateContractAddress = (newContractAddress: string): void => {
    // Validate address input on step 1
    const isValid =
      validateContractAddress(newContractAddress) === ValidationResult.VALID ||
      newContractAddress === InitialState.CONTRACT_ADDRESS ||
      false;

    // Update the contract address that we'll be pulling data from if it's valid
    if (isValid) {
      setValidationError("");
      return setContractAddress(newContractAddress.trim());
    }
    // Clear error if the invalid address is erased
    if (newContractAddress === "") return setValidationError("");
    // Set validation error if address is invalid
    setValidationError("Contract addresses need to be 36 characters");
    setContractAddress(newContractAddress.trim());
  };

  return (
    <ErrorBoundary onError={handleError}>
      {currentStep === 4 && !confettiShown && <Confetti setConfettiShown={setConfettiShown} />}
      <Navbar />
      <div id="wallet">
        <div className="title-group">
          <img alt="George Cloney signature in cursive" src={georgeCloneyTitleImg} />
          <h4>
            George Cloney will find any Tezos Smart Contract and clone it for you. <br /> Great for testing and
            exploring.
          </h4>
        </div>
        <SnackbarGroup error={error} loadingMessage={loadingMessage} />
        <WizardControls signer={signer} txnAddress={txnAddress} currentStep={currentStep} code={code} />
        <div id="main-forms">
          <ContractFetchForm
            handleError={handleError}
            code={code}
            validationError={validationError}
            contractAddress={contractAddress}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            setLoadingMessage={setLoadingMessage}
            loadingMessage={loadingMessage}
            handleContractSubmit={handleContractCodeSubmit}
            updateContractAddress={updateContractAddress}
            handleNetworkChange={handleContractNetworkChange}
            network={contractNetwork}
          />
          <ContractOriginationForm
            txnAddress={txnAddress}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            signer={signer}
            loadingMessage={loadingMessage}
            setSigner={setSigner}
            setupSigner={setupSigner}
            setLoadingMessage={setLoadingMessage}
            handleLaunchSubmit={handleContractLaunchSubmit}
            handleNetworkChange={handleLaunchNetworkChange}
            network={launchNetwork}
          />
          <ContractResultForm
            txnAddress={txnAddress}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            launchNetwork={launchNetwork}
          />
        </div>
        <ContractReviewForm setCurrentStep={setCurrentStep} currentStep={currentStep} code={code} storage={storage} />
        <LastOriginatedContract
          code={code}
          currentStep={currentStep}
          reset={resetGeorgeCloney}
          lastOriginatedContract={lastOriginatedContract}
        />
      </div>
      <div className="built-with-taquito-logo">
        <a href="https://tezostaquito.io/" target="_blank" rel="noopener noreferrer">
          <img height="56" width="128" alt="Built with Taquito logo" src={builtWithTaquitoImg} />
        </a>
      </div>
    </ErrorBoundary>
  );
};

export default App;
