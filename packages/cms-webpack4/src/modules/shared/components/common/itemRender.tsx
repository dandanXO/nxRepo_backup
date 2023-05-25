// NOTE: breadcrumb
import { Route } from "antd/es/breadcrumb/Breadcrumb";
import React from "react";
import { Link } from "react-router-dom";

export const itemRender = (route: Route, params: any, routes: Route[], paths: string[]): React.ReactNode => {
    if(route.path === "/") {
        if(!window["__POWERED_BY_QIANKUN__"]) {
            return <Link to={"/"}>{route.breadcrumbName}</Link>;
        } else {
            return <span style={{ cursor: "pointer" }} onClick={() => location.href = "/#/index"}>{route.breadcrumbName}</span>;
        }

    } else if(route.path === null) {
        return <span>{route.breadcrumbName}</span>;
    } else {
        return <Link to={route.path}>{route.breadcrumbName}</Link>;
    }
};
