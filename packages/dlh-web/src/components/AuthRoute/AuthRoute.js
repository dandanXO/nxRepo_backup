import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {axios, getLoginInfo} from 'utils';
import {Icon, Spin} from 'antd';

import {processRoutesForNewCMS} from "../../microApp/processRoutesForNewCMS";
import {isMicroApp} from "../../microApp/isMicroApp";
import Cookies from "js-cookie";

class AuthRoute extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            menu: []
        };
    }
    async getPersonalList()  {
      // NOTICE: 登入成功後，取得 PersonalList
      let { code, data } = await axios({
        url: '/hs/admin/menu/personalList',
        method: 'post'
      })

      if(Number(code) === 200) {
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
      }
      return data;
    }

    async getInfo()  {
      // NOTE:
      const getInfoResponse = await axios({
        url: '/hs/admin/auth/getInfo',
        method: 'post',
      })
      return getInfoResponse;
    }

    async componentDidMount() {
      const pipes = [
        await this.getPersonalList(),
        await this.getInfo()
      ]

      await Promise.all(pipes).then(() => {
        const menuData = pipes[0];
        const getInfoResponse = pipes[1];
        Cookies.set("adminUser", getInfoResponse);

        const isSuperAdmin = getInfoResponse.data.roleId === 1;
        localStorage.setItem("isSuperAdmin", JSON.stringify(isSuperAdmin));

        this.setState({
          menu: menuData || [],
        })
        return {menuData, isSuperAdmin}
      }).then(({menuData, isSuperAdmin}) => {
        return axios({
          url: '/hs/admin/merchant-manage/available',
          method: 'get',
        })
      }).then((merchantsData) => {
        localStorage.setItem("merchantsData", JSON.stringify(merchantsData));

        this.setState({
          setup: true,
        })
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

        if(this.state.setup) {
          // NOTE: 登入成功轉至其他頁面
          return React.cloneElement(children, { list: menu })
        } else {
          return null;
        }

    }
}

export default withRouter(AuthRoute);
