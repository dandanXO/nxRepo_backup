import * as ReactDOM from 'react-dom/client';
import App from './app/app';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   // NOTICE: [react使用antd警告:Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance](https://blog.csdn.net/qq_40314318/article/details/105209873)
//   // <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   // </StrictMode>
// );


// NOTICE: [React 18 用 createRoot 替换 render](https://juejin.cn/post/6992435557456412709)

let root

function render(props) {
  // NOTICE: 17
  const { container } = props;
  // ReactDOM.render(<App />, container ? container.querySelector('#root') : document.querySelector('#root'));


  // const newContainer = document.getElementById('app');
  // const root = ReactDOM.createRoot(newContainer);
  // root.render(<App />);

  const newContainer = container ? container.querySelector('#root') : document.querySelector('#root')
  root = ReactDOM.createRoot(newContainer);
  root.render(<App />);

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
