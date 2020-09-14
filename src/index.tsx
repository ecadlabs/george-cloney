import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";

Bugsnag.start({
  apiKey: "6aaa796f2854860cc32cc07f2f092eab",
  plugins: [new BugsnagPluginReact()],
});

const ErrorBoundary = (Bugsnag.getPlugin("react") as any).createErrorBoundary(React);

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById("root")
);
