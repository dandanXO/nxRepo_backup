import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Divider } from 'antd';

import 'antd/dist/antd.min.css';
import './App.css';

import LibVersion from './components/LibVersion';
import HelloModal from './components/HelloModal';

import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const NotFound = () => <div>Not Found</div>
const RouteExample = () => {
  return (
    <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/app-react-history' : '/child/react-history/'}>
      <nav>
        <Link to="/">Home</Link>
        <Divider type="vertical" />
        <Link to="/about">About</Link>
      </nav>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="*" component={NotFound}/>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default function App() {
  return (
    <div className="app-main">
      <LibVersion />
      <HelloModal />

      <Divider />

      <RouteExample />
    </div>
  );
}
