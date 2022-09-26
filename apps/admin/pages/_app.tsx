import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from "react-redux";
import { appStore } from "../store"

// [style is broken on build but works on dev env](https://github.com/SolidZORO/next-plugin-antd-less/issues/103)
// import 'antd/dist/antd.less';
require('antd/dist/antd.less');


function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={appStore}>
        <Head>
          <title>后台管理系统</title>
        </Head>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </Provider>
    </>
  );
}

export default CustomApp;
