import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Menu, Icon} from 'antd';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";

const {SubMenu} = Menu;

// import list from './menuConfig';
import styles from './LayoutMenu.less';


class LayoutMenu extends Component {
    constructor(props) {
        super(props);
        const { location: { pathname } } = this.props;
        const pathArr = pathname.split('/');
      
        let truePath = '/' + pathArr[1];

        if(truePath === "/cms") {
            truePath = '/' + pathArr[1] +'/' + pathArr[2]
        }
        
        this.state = {
            openKeys: this.findKeys(truePath),
            selectedKeys: [truePath]
        };
    }

    findKeys = (pathname) => {
        const { list } = this.props;
        for(let i = 0, len = list.length; i < len; i++) {
            const current = list[i];
            if(current['actionUrl'] === pathname) {
                return [];
            }
            if(current['children']) {
                const value = current['children'].find(val => val['actionUrl'] === pathname);
                if(value) {
                    return [current['actionUrl']]
                }
            }
        }
        return [];
    }


    handleItemClick = ({key, keyPath}) => {
        this.setState({ selectedKeys: [key] });
        // TODO: for micro app
        // console.log("menu.key", key)
        // if(key === "/cws/product") {
        //   const event = new Event("main-app-hashchange", {
        //     name: "andy"
        //   })
        //   window.dispatchEvent(event)
        // }
        const { history } = this.props;
        history.push(key);


    }

    handleOpen = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
    }

    renderItem = (list) => {
        return list.map((item, index) => {
            const subArr = item['children'];
            const itemName = String(item['name']).trim();

            if (subArr) {

                return (
                    <SubMenu
                        key={item['actionUrl']}
                        title={<span><Icon type={item['iconCss']}/><span><FormattedMessage id={itemName} /></span></span>}
                    >
                        {this.renderItem(subArr)}
                    </SubMenu>
                );
            }
            return (
                <Menu.Item
                    key={item['actionUrl']}
                    onClick={this.handleOpenMenu}
                >
                    <Icon type={item['iconCss']} />
                    <span><FormattedMessage id={itemName} /></span>
                </Menu.Item>
            );


        })
    }

    componentWillReceiveProps(nextProps) {
        const { isTrigger, location: { pathname } } = nextProps;
        const { location: { pathname: PrevPathname } } = this.props;
        if(isTrigger !== this.props.isTrigger) {
            this.setState({
                openKeys: []
            })
        }
        if(pathname !== PrevPathname) {
            const pathArr = pathname.split('/');
            let truePath = '/' + pathArr[1];

            if(truePath === "/cms") {
                truePath = '/' + pathArr[1] +'/' + pathArr[2]
            }
            
            this.setState({
                openKeys: this.findKeys(truePath),
                selectedKeys: [truePath]
            })
        }
    }

    render() {
        const {openKeys, selectedKeys} = this.state;
        const { list } = this.props;
        //首页
        // const realList = [{
        //     actionUrl: '/index',
        //     iconCss: 'home',
        //     name: '首页',
        //     children: null
        // }].concat(list);
        return (
            <Menu
                className={styles.menuWrapper}
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                onOpenChange={this.handleOpen}
                onClick={this.handleItemClick}
                mode="inline"
                inlineIndent={18}
            >
                {this.renderItem(list)}
            </Menu>
        );
    }
}
LayoutMenu.propTypes = {
    isTrigger: PropTypes.bool,
    list: PropTypes.array,
};
LayoutMenu.defaultProps = {
    isTrigger: false,
    list: []
};
export default withRouter(LayoutMenu);
