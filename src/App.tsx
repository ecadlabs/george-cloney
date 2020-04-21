import React, { useState, ReactElement, useEffect } from "react";
import { Tezos } from "@taquito/taquito";
import { MichelsonV1Expression } from "@taquito/rpc";
import Editor from "./components/Editor";
import ContractCodeForm from "./components/ContractCodeForm";
import ContractOriginationForm from "./components/ContractOriginationForm";
import ContractResultForm from "./components/ContractResultForm";
import SnackbarGroup from "./components/SnackbarGroup";
import LastLaunchedContract from "./components/LastLaunchedContract";
import WizardControls from "./components/WizardControls";
import Navbar from "./components/Navbar";
import setSignerMethod from "./utils/set-signer-method";
import "./App.css";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

const App: React.FC = (): ReactElement => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [snackbar, showSnackbar] = useState<boolean>(false);
  const [signer, setSigner] = useState<string>("");
  const [provider, setProvider] = useState<string>("");
  const [code, setCode] = useState<MichelsonV1Expression[]>([]);
  const [storage, setStorage] = useState<MichelsonV1Expression | string>();
  const [launchNetwork, setLaunchNetwork] = useState<string>("mainnet");
  const [contractNetwork, setContractNetwork] = useState<string>("mainnet");
  const [contractAddress, setContractAddress] = useState<string>("");
  const [txnAddress, setTxnAddress] = useState<string>("");
  const [lastLaunchedContract, setLastLaunchedContract] = useState<string>("");

  useEffect(() => {
    if (txnAddress) {
      localStorage.setItem("lastLaunchedContract", txnAddress);
    }
    const lastLaunchedContract = localStorage.getItem("lastLaunchedContract") as string;
    setLastLaunchedContract(lastLaunchedContract);
  }, [txnAddress]);

  const handleError = (error: any): void => {
    setLoading(false);
    showSnackbar(false);
    setLoadingMessage("");
    setError(error?.message ?? error);
    showSnackbar(true);
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
    // Empty provider if network is sandbox so that user can provide a local node address
    if (network === "sandbox") {
      setProvider("");
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
    setContractAddress("");
    setLoadingMessage("");
    setLoading(false);
  };

  const closeSnackbar = (): void => {
    // Remove snackbar
    showSnackbar(false);
  };

  const updateContractAddress = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // Update the contract address that we'll be pulling data from
    setContractAddress(event.target.value);
  };

  const updateSigner = async (event: React.MouseEvent<HTMLInputElement>): Promise<any> => {
    // Update the signer method
    setSigner(event.currentTarget.value);
  };

  return (
    <>
      <Navbar />
      <div className="top-header">
        {lastLaunchedContract && <LastLaunchedContract lastLaunchedContract={lastLaunchedContract} />}
      </div>
      <div id="wallet">
        <div className="title-group">
          <h1>The George Cloney</h1>
          <h4>
            George Cloney, being the gentleman he is, will take any Tezos Smart Contract <br /> and clone it for you.
            Great for testing and exploring.
          </h4>
        </div>
        <SnackbarGroup
          snackbar={snackbar}
          closeSnackbar={closeSnackbar}
          error={error}
          loading={loading}
          loadingMessage={loadingMessage}
        />
        <WizardControls
          txnAddress={txnAddress}
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          signer={signer}
          code={code}
        />
        <div id="main-forms">
          <ContractCodeForm
            contractAddress={contractAddress}
            currentStep={currentStep}
            loading={loading}
            handleContractSubmit={handleContractCodeSubmit}
            updateContractAddress={updateContractAddress}
            handleNetworkChange={handleContractNetworkChange}
            network={contractNetwork}
          />
          <ContractOriginationForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            loading={loading}
            signer={signer}
            updateSigner={updateSigner}
            handleLaunchSubmit={handleContractLaunchSubmit}
            handleNetworkChange={handleLaunchNetworkChange}
            network={launchNetwork}
          />
          <ContractResultForm txnAddress={txnAddress} currentStep={currentStep} launchNetwork={launchNetwork} />
        </div>
        <Editor currentStep={currentStep} code={code} storage={storage} />
      </div>
      <div className="built-with-taquito-logo">
        <img height="56" width="128" alt="Built with Taquito logo" src="built-with-taquito.png" />
      </div>
    </>
  );
};

export default App;
