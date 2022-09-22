import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from "react-redux";
import { appStore } from "../../../packages/cms/src/store"

// [style is broken on build but works on dev env](https://github.com/SolidZORO/next-plugin-antd-less/issues/103)
// import 'antd/dist/antd.less';
require('antd/dist/antd.less');

function CustomApp({ Component, pageProps }: AppProps) {
  // const [domLoaded, setDomLoaded] = useState(false);
  // useEffect(() => {
  //   setDomLoaded(true);
  //   console.log("window.sessionStorage");
  //   console.log(window.sessionStorage.getItem("adminUser"))
  // }, []);
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
