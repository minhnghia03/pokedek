import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../src/layouts";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Router } from "next/router";

NProgress.configure({
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
