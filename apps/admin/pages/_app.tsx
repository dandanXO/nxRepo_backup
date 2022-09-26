import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from "react-redux";
import { appStore } from "../store"
import {useCallback, useState} from "react";
import {useLoginMutation} from "../api";

// [style is broken on build but works on dev env](https://github.com/SolidZORO/next-plugin-antd-less/issues/103)
// import 'antd/dist/antd.less';
require('antd/dist/antd.less');

// const Form = (props) => {
//   const { setLogin } = props;
//   const [triggerLogin, { isSuccess: isLoginSuccess }] = useLoginMutation();
//   const login = useCallback(() => {
//     // if (!isLoginSuccess) {
//     triggerLogin({
//       phoneNo: "19888888888",
//       code: "123456"
//     }).unwrap().then(() => {
//       setLogin(true);
//     }).catch((errror) => {
//       setLogin(false);
//     })
//     // }
//     // if (isLoginSuccess) props.triggerGetList(null);
//   }, [triggerLogin])
//
//   const [form, setForm] = useState({
//     phoneNo: "",
//     code: "",
//   });
//   const onChange = useCallback((event, name) => {
//     const value = event.target.value;
//     console.log("value", value);
//     setForm({
//       ...form,
//       [name]: value,
//     })
//   }, []);
//   return (
//     <div>
//       <input type="text" name='phoneNo' onChange={(event) => onChange(event, "phoneNo")}/>
//       <input type="password" name="code" onChange={(event) => onChange(event, "code")}/>
//       <button onClick={() => login()}>Login</button>
//     </div>
//   )
// }
function CustomApp({ Component, pageProps }: AppProps) {
  // console.log("Component", Component);
  // console.log("pageProps", pageProps);
  // const [domLoaded, setDomLoaded] = useState(false);
  // useEffect(() => {
  //   setDomLoaded(true);
  //   console.log("window.sessionStorage");
  //   console.log(window.sessionStorage.getItem("adminUser"))
  // }, []);
  // const [isLogin, setLogin] = useState(false);
  // console.log("isLogin", isLogin);
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
