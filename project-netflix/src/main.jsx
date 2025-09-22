import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LoaderProvider } from "./components/Loader/LoaderContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </BrowserRouter>
  </StrictMode>
);
