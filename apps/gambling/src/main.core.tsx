import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ReduxRouter, ReduxRouterSelector} from "@lagunovsky/redux-react-router";
import {Provider, useDispatch, useSelector} from "react-redux";
import {appStore, RootState} from './app/reduxStore';
import { history } from  "./app/reduxStore/index";

import "./app/ui/pageTemplate/deviceBreakpoints/UIAutolayout";
import "./environments/theme.css"
import "./app/ui/style.css";

type ICoreMain = {
  children: React.ReactElement;
};

const routerSelector: ReduxRouterSelector<RootState> = (state) =>
  state.navigator;

export const CoreMain = (props: ICoreMain) => {
  return (
    <Provider store={appStore}>
      <ReduxRouter history={history} routerSelector={routerSelector}>
        <BrowserRouter basename={'/'}>{props.children}</BrowserRouter>
        {/*<RouterProvider router={appRouter as any} fallbackElement={<div>Loading...</div>} />*/}
      </ReduxRouter>
    </Provider>
  );
};
