import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { getLoginInfo, userLogout, axios } from 'utils';
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
      // console.log("[AuthRoute] componentDidMount");

        const _this = this;
        axios({
            url: '/hs/admin/menu/personalList',
            method: 'post'
        }).then((res) => {

            if(Number(res.code) === 200) {
                let { data } = res;

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
                  // 用戶管理
                  if(menuItem.actionUrl === "/userManage") {
                    menuItem.children.map(level2MenuItem => {
                      // 用戶管理
                      if(level2MenuItem.actionUrl === "/userInfoManage") {
                        level2MenuItem.actionUrl = "/cms/user";
                      }
                      // 用戶終審
                      if(level2MenuItem.actionUrl === "/userLastCheck") {
                        level2MenuItem.actionUrl = "/cms/user-review";
                      }
                      // 黑名單
                      if(level2MenuItem.actionUrl === "/blackListManage") {
                        level2MenuItem.actionUrl = "/cms/blacklist";
                      }
                      // 白名單
                      if(level2MenuItem.actionUrl === "/whiteListManage") {
                        level2MenuItem.actionUrl = "/cms/whitelist";
                      }
                    })
                  }
                  // 渠道管理
                  if(menuItem.actionUrl === "/channelManage") {
                    menuItem.children.map(level2MenuItem => {
                      if(level2MenuItem.actionUrl === "/channelList") {
                        level2MenuItem.actionUrl = "/cms/channel";
                      }
                    })
                  }

                  if(menuItem.actionUrl === "/platform-manage") {
                    menuItem.children.map(level2MenuItem => {
                      if(level2MenuItem.actionUrl === "/merchant-manage") {
                        level2MenuItem.actionUrl = "/cms/merchant";
                      } else if(level2MenuItem.actionUrl === "/product-manage") {
                        level2MenuItem.actionUrl = "/cms/product";
                      }
                    })
                  }
                  if(menuItem.actionUrl === "/riskConfigManage") {
                    menuItem.children.map(level2MenuItem => {
                      if(level2MenuItem.actionUrl === "/risk-model-setting") {
                        level2MenuItem.actionUrl = "/cms/risk-setting";
                      }
                    })
                  }

                  if(menuItem.actionUrl === "/orderManagement") {
                      menuItem.children.map(level2MenuItem => {
                          // 訂單列表
                          if (level2MenuItem.actionUrl === "/orderList") {
                              level2MenuItem.actionUrl = "/cms/order";
                          }
                          // 訂單終審
                          if (level2MenuItem.actionUrl === "/businessLastCheck") {
                              level2MenuItem.actionUrl = "/cms/order-review";
                          }
                      })
                  }
                  if(menuItem.actionUrl === "/h5Manage") {
                    menuItem.children.map(level2MenuItem => {
                      // 廣告管理
                      if (level2MenuItem.actionUrl === "/activity-setting") {
                        level2MenuItem.actionUrl = "/cms/activity-ads";
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
