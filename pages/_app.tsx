import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../hooks/useAuth";
import { ModalProvider } from "../hooks/useModal";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </AuthProvider>
  );
}

export default MyApp;
