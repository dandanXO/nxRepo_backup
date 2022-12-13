import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {axios, getLoginInfo} from 'utils';
import {Icon, Spin} from 'antd';

import {processRoutesForNewCMS} from "../../microApp/processRoutesForNewCMS";
import {isMicroApp} from "../../microApp/isMicroApp";

class AuthRoute extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            menu: []
        };
    }
    componentDidMount() {
      // console.log("[AuthRoute] componentDidMount");

        const _this = this;

        // NOTICE: 登入成功後，取得 PersonalList
        axios({
            url: '/hs/admin/menu/personalList',
            method: 'post'
        }).then((res) => {

            if(Number(res.code) === 200) {
                let { data } = res;

                // NOTE: 前端增加首頁選單
                data = [{
                    actionUrl: '/index',
                    iconCss: 'home',
                    name: 'menu.homePage',
                    children: null
                }].concat(data);

              // NOTICE: MicroAPP
              if(isMicroApp) {
                data = processRoutesForNewCMS(data);
              }
              _this.setState({
                  menu: data || []
              });
            }
        })
    }

    render() {
        const { location: { pathname }, children } = this.props;
        const { menu } = this.state;

        const antIcon = <Icon type="loading-3-quarters" style={{ fontSize: 50 }} spin />;

        if(menu.length === 0) {
            return (
                <div style={{ width: '100%', height: '100%', textAlign: 'center', lineHeight: '100vh' }}>
                    <Spin indicator={antIcon} />
                </div>
            );
        }

        // NOTE: "/" 強轉至 "/index"
        if(pathname === '/') {
            return <Redirect to={'/index'}/>
        }

        const hasLoginInfo = getLoginInfo();
        const isToLoginPage = pathname === '/login';

        // NOTE: 登入失效跳轉至登入
        if(!isToLoginPage && !hasLoginInfo) {
            return <Redirect to="/login" />;
        }

        // NOTE: 登入成功跳轉至首頁
        if(isToLoginPage && hasLoginInfo) {
            return <Redirect to={'/index'}/>;
        }

        // NOTE: 登入成功轉至其他頁面
        return React.cloneElement(children, { list: menu })
    }
}

export default withRouter(AuthRoute);
