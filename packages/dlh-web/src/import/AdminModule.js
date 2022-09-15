import React from "react";
import { withRouter } from 'react-router-dom';

// REFACTOR
const adminURLBase = () => {
  if(window.top == window.self) {
    // Top level window
    const env = process.env.NODE_ENV
    if(env == "development"){
      console.log("[Debug][env development")
      return "http://localhost:4200";
    }
    else if (env == "production"){
      console.log("[Debug][env] production")
      return "/new-admin";
    }
  } else {
    // Not top level. An iframe, popup or something
    return "/new-admin";
  }

}

const PageURL = (actionUrl) => adminURLBase() + actionUrl;

const Iframe = (props) => {
  const { location: { pathname } } = props;
  console.log("pathname", pathname);
  const url = {
    '/merchant-manage': "/merchantManage",
    '/product-manage': "/product"
  }[pathname];
  // console.log("url", url)
  return (
    <iframe style={{ border: 0, width: "100%", height: "100%"}} src={PageURL(url)}/>
  )
}
const IframeWithRouter = withRouter(Iframe);

const AdminRoutes = [
  {
    path: '/merchant-manage',
    // component: SimpleIframe,
    component: IframeWithRouter,
    exact: true
  },
  {
    path: '/product-manage',
    // component: SimpleIframe,
    component: IframeWithRouter,
    exact: true
  },
];

const adminRoutesPath = AdminRoutes.map(route => route.path);
export {
  AdminRoutes,
  adminRoutesPath,
}
