import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";
import { ProviderProps } from "./types";
import "../../App.css";

const Provider: any = (props: ProviderProps) => {
  const { register, handleSubmit } = useForm();
  const [providerMsg, setProviderMsg] = useState("");
  const [snackbar, showSnackbar] = useState(false);
  const { updateProvider, provider, loading } = props;

  const onSubmit = async (data: any) => {
    if (data.rpc) {
      updateProvider(data.rpc);
    }
    setProviderMsg("Provider set and key file is importing");
    showSnackbar(true);
  };

  const closeSnackbar = () => {
    showSnackbar(false);
  };

  return (
    <div id="rpc">
      <h3>Provider</h3>
      {providerMsg && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackbar}
          autoHideDuration={3000}
          onClose={closeSnackbar}
        >
          <MuiAlert elevation={6} variant="filled" onClose={closeSnackbar} severity="success">
            {providerMsg}
          </MuiAlert>
        </Snackbar>
      )}
      <div id="rpc-dialog">
        <div id="rpc-content">
          <div id="balance-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                onChange={updateProvider}
                value={provider || "https://api.tez.ie/rpc/carthagenet"}
                id="rpc-input"
                name="rpc"
                ref={register}
              />
              <br />
              <input disabled={loading ? true : false} id="show-balance-button" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Provider;
