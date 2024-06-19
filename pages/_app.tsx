import { ThemeProvider } from "@/components/ThemeProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <title>Toka</title>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange>
      <Component {...pageProps} />
    </ThemeProvider>
  </>;
}
