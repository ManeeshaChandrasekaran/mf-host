import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { loadRemotes } from "./loadRemotes";

// Function to render the app
const renderApp = () => {
  const container = document.getElementById("root");
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
};

// First, load remoteEntry.js for all microfrontends
loadRemotes()
  .then(() => {
    console.log("✅ All remotes loaded. Rendering host app...");
    renderApp();
  })
  .catch((err) => {
    console.error("❌ Failed to load remotes, rendering host anyway.", err);
    renderApp();
  });
