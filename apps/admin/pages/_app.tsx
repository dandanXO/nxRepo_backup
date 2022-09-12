import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

// [style is broken on build but works on dev env](https://github.com/SolidZORO/next-plugin-antd-less/issues/103)
// import 'antd/dist/antd.less';
require('antd/dist/antd.less');

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to admin!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
