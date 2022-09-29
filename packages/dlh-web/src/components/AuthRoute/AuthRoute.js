import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { hasLogin, hasGoogleAuth, axios } from 'utils';
import { Icon, Spin } from 'antd';
import Cookies from 'js-cookie';
import {microApp} from "../../index";

class AuthRoute extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            menu: []
        };
    }
    componentDidMount() {
        const _this = this;
        axios({
            url: '/hs/admin/menu/personalList',
            method: 'post'
        }).then((res) => {


            if(res) {
                let { data } = res;
               // alert(JSON.stringify(data));
                if(data && data.code == '400'){
                    const {history} = this.props;
                    sessionStorage.setItem("adminUser", null);
                    Cookies.remove('isLogin');
                    history.push('/login');
                }


                data = [{
                    actionUrl: '/index',
                    iconCss: 'home',
                    name: 'menu.homePage',
                    children: null
                }].concat(data);

              // FIXME: MicroAPP
              if(microApp) {
                console.log("[MainApp][before] menu", data);
                data = data.map(menuItem => {
                  if(menuItem.actionUrl === "/platform-manage") {
                    menuItem.children.map(level2MenuItem => {
                      if(level2MenuItem.actionUrl === "/merchant-manage") {
                        level2MenuItem.actionUrl = "/cms/merchant";
                      } else if(level2MenuItem.actionUrl === "/product-manage") {
                        level2MenuItem.actionUrl = "/cms/product";
                      }
                    })
                  }
                  return menuItem;
                })
                console.log("[MainApp][after] menu", data);
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

        const isLogin = hasLogin();


        const antIcon = <Icon type="loading-3-quarters" style={{ fontSize: 50 }} spin />;

        if(menu.length === 0) {
            return (
                <div style={{ width: '100%', height: '100%', textAlign: 'center', lineHeight: '100vh' }}>
                    <Spin indicator={antIcon} />
                </div>
            );
        }




        if(pathname === '/') {
            return <Redirect to={'/index'}/>
        }

        const isToLogin = pathname === '/login';
        if(!isLogin && !isToLogin) {
            return <Redirect to="/login" />;
        }
        if(isLogin && isToLogin) {
            return <Redirect to={'/index'}/>;
        }
        return React.cloneElement(children, { list: menu })
    }
}

export default withRouter(AuthRoute);
