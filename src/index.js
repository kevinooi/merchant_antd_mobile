import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SWRConfig } from "swr";
import { BrowserRouter } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import axios from "axios";

const fetcher = async (...args) => {
  const url = args[0];

  return axios.get(url).then((res) => res.data);
};

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();
const engine = new Styletron();

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig
      value={{ fetcher, revalidateOnFocus: false, errorRetryCount: 3 }}
    >
      <StyletronProvider value={engine} debug={debug} debugAfterHydration>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StyletronProvider>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
