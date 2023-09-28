import "minireset.css";
import "../styles/global.css";

import type { AppProps } from "next/app";
import attachThemeGlobalCss from "ui/helpers/attachThemeGlobalCss";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

attachThemeGlobalCss();

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
