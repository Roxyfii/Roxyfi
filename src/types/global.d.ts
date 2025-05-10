// global.d.ts
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider; // Ensure the type is consistent across the project
  }
}
