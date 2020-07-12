import React, { useState, ReactElement, useEffect } from "react";
import { Tezos } from "@taquito/taquito";
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
import { TEST_NETWORK, NetworkType } from "./utils/constants";

const App: React.FC = (): ReactElement => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");
  const [snackbar, showSnackbar] = useState<boolean>(false);
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

  const handleError = (error: any): void => {
    // Get state ready for Snackbar displays
    setLoading(false);
    showSnackbar(false);
    setLoadingMessage("");
    if (error && error.status === 404) {
      setError(error.message + "\n This typically means the contract was not found on this network.");
    } else {
      setError(error?.message ?? error);
    }
    showSnackbar(true);
    // Remove error after 5 seconds
    setTimeout(() => setError(""), 5000);
  };

  const resetGeorgeCloney = (): void => {
    // Set entire application back to initial state
    setCurrentStep(1);
    setLoading(false);
    setLoadingMessage("");
    setError("");
    showSnackbar(false);
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
      setLoading(true);
      setLoadingMessage("Loading contract code...");
      showSnackbar(true);
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
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  const setupSigner = async (signer: string): Promise<void> => {
    if (signer === "beacon") {
      const beaconWallet = new BeaconWallet({
        name: "georgeCloneyWallet",
      });
      await beaconWallet.client.init();
      await beaconWallet.client.removeAllPeers();
      await beaconWallet.requestPermissions({
        network: {
          type: NetworkType.CARTHAGENET,
          name: "Carthagenet",
          rpcUrl: `https://api.tez.ie/rpc/${TEST_NETWORK}`,
        },
      });
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
      Tezos.setProvider({ wallet: new TezBridgeWallet() });
    }
  };

  const handleContractLaunchSubmit = async (): Promise<void> => {
    // Set snackbar
    setLoading(true);
    setLoadingMessage("Launching contract...");
    showSnackbar(true);

    const defaultStorage = await generateDefaultStorage(contractAddress, contractNetwork);
    console.log(defaultStorage.msg);
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
        // Remove contract launch snackbar message
        setLoading(false);
        showSnackbar(false);
        // Add block explorer snackbar message
        setLoadingMessage("");
        setTxnAddress(contract.address);
        setCurrentStep(4);
      })
      .catch(async (error) => {
        setLoading(false);
        showSnackbar(false);
        setLoadingMessage("");
        setSigner("");
        if (error && error.status === 404) {
          setError(error.message + "\n This typically means the contract was not found on this network.");
        } else {
          setError(error?.message ?? error);
        }
        showSnackbar(true);
      });
  };

  const closeSnackbar = (): void => {
    // Remove snackbar
    showSnackbar(false);
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
        <SnackbarGroup
          snackbar={snackbar}
          closeSnackbar={closeSnackbar}
          error={error}
          loading={loading}
          loadingMessage={loadingMessage}
        />
        <WizardControls signer={signer} txnAddress={txnAddress} currentStep={currentStep} code={code} />
        <div id="main-forms">
          <ContractFetchForm
            handleError={handleError}
            code={code}
            validationError={validationError}
            contractAddress={contractAddress}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            loading={loading}
            handleContractSubmit={handleContractCodeSubmit}
            updateContractAddress={updateContractAddress}
            handleNetworkChange={handleContractNetworkChange}
            network={contractNetwork}
          />
          <ContractOriginationForm
            txnAddress={txnAddress}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            loading={loading}
            signer={signer}
            setSigner={setSigner}
            setupSigner={setupSigner}
            setLoading={setLoading}
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
