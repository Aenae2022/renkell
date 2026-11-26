import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18n";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
(
  globalThis as typeof globalThis & {
    Buffer: typeof Buffer;
  }
).Buffer = Buffer;
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer autoClose={1500} position="top-center" />
    </AuthProvider>
  </StrictMode>,
);
