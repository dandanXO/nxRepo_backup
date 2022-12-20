import "./public-path.ts"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../../cms-webpack4/src/App';
import reportWebVitals from './reportWebVitals';


// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <App />
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



let root

function render(props) {
  console.log("props", props)
  // NOTICE: 17
  const { container } = props;
  // ReactDOM.render(<App />, container ? container.querySelector('#root') : document.querySelector('#root'));


  // const newContainer = document.getElementById('app');
  // const root = ReactDOM.createRoot(newContainer);
  // root.render(<App />);

  const newContainer = container ? container.querySelector('#root') : document.querySelector('#root')
  console.log("0");
  root = ReactDOM.createRoot(newContainer);
  console.log("1");
  root.render(<App />);
  console.log("2");

}

function storeTest(props) {
  props.onGlobalStateChange((value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev), true);
  props.setGlobalState({
    ignore: props.name,
    user: {
      name: props.name,
    },
  });
}

if (!window["__POWERED_BY_QIANKUN__"]) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function update(props) {
  console.log('[react16] update props', props)
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
  storeTest(props);
  render(props);
}

// [Updates to Client Rendering APIs](https://zh-hant.reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis)
export async function unmount(props) {
  // NOTICE: 17
  // const { container } = props;
  // ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
  root.unmount();
}

// window["qiankunLifecycle"] = {
//   bootstrap,
//   mount,
//   unmount,
//   update,
// };