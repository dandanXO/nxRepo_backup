import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

// TODO: 18
// let root;

function render(props) {
    console.log('render.props', props);
    // NOTICE: 17
    const { container } = props;
    ReactDOM.render(<App />, container ? container.querySelector('#root') : document.querySelector('#root'));

    // TODO: 18
    // const newContainer = document.getElementById('app');
    // const root = ReactDOM.createRoot(newContainer);
    // root.render(<App />);

    // const newContainer = container ? container.querySelector('#root') : document.querySelector('#root')
    // console.log("0");
    // root = ReactDOM.createRoot(newContainer);
    // console.log("1");
    // root.render(<App />);
    // console.log("2");
}

function storeTest(props) {
    props.onGlobalStateChange(
        (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
        true,
    );
    props.setGlobalState({
        ignore: props.name,
        user: {
            name: props.name,
        },
    });
}

if (!window['__POWERED_BY_QIANKUN__']) {
    console.log('[cms-webpack4] 不在 qiankun 內');
    render({});
} else {
    console.log('[cms-webpack4] 在 qiankun 內');
}

export async function bootstrap(): Promise<void> {
    console.log('[cms-webpack4] react app bootstraped');
}

export async function update(props: Record<any, any>): Promise<void> {
    console.log('[cms-webpack4] update props', props);
}

export async function mount(props: Record<any, any>): Promise<void> {
    console.log('[cms-webpack4] mount props', props);
    storeTest(props);
    render(props);
}

// [Updates to Client Rendering APIs](https://zh-hant.reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis)
export async function unmount(props: Record<any, any>): Promise<void> {
    console.log('[cms-webpack4] unmount props', props);
    // NOTICE: 17
    const { container } = props;
    ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
    // TODO: 18
    // root.unmount();
}
