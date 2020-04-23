import React, { useState, ReactElement, useEffect } from "react";
import { Tezos } from "@taquito/taquito";
import { MichelsonV1Expression } from "@taquito/rpc";
import { ValidationResult, validateContractAddress } from "@taquito/utils";
import Editor from "./components/Editor";
import ContractFetchForm from "./components/ContractFetchForm";
import ContractOriginationForm from "./components/ContractOriginationForm";
import ContractResultForm from "./components/ContractResultForm";
import SnackbarGroup from "./components/SnackbarGroup";
import LastOriginatedContract from "./components/LastOriginatedContract";
import WizardControls from "./components/WizardControls";
import Navbar from "./components/Navbar";
import Confetti from "./components/Confetti";
import ErrorBoundary from "react-error-boundary";
import setSignerMethod from "./utils/set-signer-method";
import "./App.css";

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
  const [launchNetwork, setLaunchNetwork] = useState<string>("mainnet");
  const [contractNetwork, setContractNetwork] = useState<string>("mainnet");
  const [contractAddress, setContractAddress] = useState<string>("");
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
    setLaunchNetwork("mainnet");
    setContractNetwork("mainnet");
    setContractAddress("");
    setTxnAddress("");
    setLastOriginatedContract("");
    setConfettiShown(false);
  };

  const handleLaunchNetworkChange = async (network: string): Promise<void> => {
    // Empty provider if network is sandbox so that user can provide a local node address
    if (network !== "sandbox") {
      await Tezos.setProvider({ rpc: `https://api.tez.ie/rpc/${network}` });
      setProvider(`https://api.tez.ie/rpc/${network}`);
    }
    setLaunchNetwork(network);
  };

  const handleContractNetworkChange = (network: string): void => {
    // If network is a custom network update accordingly
    if (network !== "mainnet" && network !== "carthagenet") {
      setProvider(network);
    }
    setProvider(`https://api.tez.ie/rpc/${network}`);
    setContractNetwork(network);
  };

  const handleContractLaunchSubmit = async (): Promise<void> => {
    // Set snackbar
    setLoading(true);
    setLoadingMessage("Launching contract...");
    showSnackbar(true);
    // Make sure provider is updated to reflect launch network in the UI
    setProvider(`https://api.tez.ie/rpc/${launchNetwork}`);
    // Ensure provider is set to Launch Contract div's desired network
    await Tezos.setProvider({
      config: { confirmationPollingTimeoutSecond: 60 },
      rpc: `https://api.tez.ie/rpc/${launchNetwork}`,
    });
    await setSignerMethod(
      signer,
      contractNetwork,
      launchNetwork,
      code,
      storage,
      setLoading,
      showSnackbar,
      setLoadingMessage,
      setTxnAddress,
      handleError
    );
    // Tezbridge is originated in setSignerMethod function
    if (signer !== "tezbridge") {
      // Originate a new contract
      Tezos.contract
        .originate({
          code: code as MichelsonV1Expression[],
          init: storage as MichelsonV1Expression,
        })
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
        .catch((error) => {
          setLoading(false);
          showSnackbar(false);
          setLoadingMessage("");
          setError(error?.message ?? error);
          showSnackbar(true);
        });
    }
  };

  const handleContractCodeSubmit = async (): Promise<any> => {
    try {
      // Grab contracts code from the blockchain and add code to the editors
      setLoading(true);
      setLoadingMessage("Loading contract code...");
      showSnackbar(true);
      await Tezos.setProvider({ rpc: provider });

      // Call contract and get code
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

  const closeSnackbar = (): void => {
    // Remove snackbar
    showSnackbar(false);
  };

  const updateContractAddress = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const isValid = validateContractAddress(event.target.value) === ValidationResult.VALID || false;
    // Update the contract address that we'll be pulling data from if it's valid
    if (isValid) {
      setValidationError("");
      return setContractAddress(event.target.value.trim());
    }
    // Clear error if the invalid address is erased
    if (event.target.value === "") return setValidationError("");
    // Set validation error if address is invalid
    setValidationError("Contract addresses need to be 36 characters");
  };

  return (
    <ErrorBoundary onError={handleError}>
      {currentStep === 4 && !confettiShown && <Confetti setConfettiShown={setConfettiShown} />}
      <Navbar />
      <div id="wallet">
        <div className="title-group">
          <img alt="George Cloney signature in cursive" src="george-cloney-title.png" />
          <h4>
            George Cloney, being the gentleman he is, will take any Tezos Smart Contract and clone it for you. Great for
            testing and exploring.
          </h4>
        </div>
        <SnackbarGroup
          snackbar={snackbar}
          closeSnackbar={closeSnackbar}
          error={error}
          loading={loading}
          loadingMessage={loadingMessage}
        />
        <WizardControls txnAddress={txnAddress} currentStep={currentStep} code={code} />
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
        <Editor setCurrentStep={setCurrentStep} currentStep={currentStep} code={code} storage={storage} />
        <LastOriginatedContract
          code={code}
          currentStep={currentStep}
          reset={resetGeorgeCloney}
          lastOriginatedContract={lastOriginatedContract}
        />
      </div>
      <div className="built-with-taquito-logo">
        <a href="https://github.com/ecadlabs/taquito" target="_blank" rel="noopener noreferrer">
          <img height="56" width="128" alt="Built with Taquito logo" src="built-with-taquito.png" />
        </a>
      </div>
    </ErrorBoundary>
  );
};

export default App;
