import React from "react";
import { withRouter } from 'react-router-dom';

const adminURLBase = () => "http://localhost:4200";
const PageURL = (actionUrl) => adminURLBase() + actionUrl;

const Iframe = (props) => {
  const { location: { pathname } } = props;
  console.log("pathname", pathname);
  const url = {
    '/merchant-manage': "/merchantManage",
    '/product-manage': "/product"
  }[pathname];
  return (
    <iframe style={{ border: 0, width: "100%", height: "100%"}} src={PageURL(url)}/>
  )
}
const IframeWithRouter = withRouter(Iframe);

const SimpleIframe = () => (
  <iframe style={{ border: 0, width: "100%", height: "100%"}} src={"http://localhost:4200/demo"}/>
)
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
