import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import config from './config/config';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={config.authDomain}
      clientId={config.authClientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
