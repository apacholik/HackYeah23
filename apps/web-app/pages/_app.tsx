import "minireset.css";
import '../styles/global.css';

import type { AppProps } from "next/app";

import { Base as Layout } from "../components/layout";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

export default function App({ Component, pageProps }: AppProps) {
  return <Layout><Component {...pageProps} /></Layout>;
}
