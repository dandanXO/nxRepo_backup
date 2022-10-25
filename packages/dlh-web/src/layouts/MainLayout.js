import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Icon, Alert } from 'antd';
import LayoutHeader from './LayoutHeader/LayoutHeader';
import LayoutContent from './LayoutContent/LayoutContent';
import LayoutMenu from './LayoutMenu/LayoutMenu';
import { PathBread } from 'components';
import PropTypes from 'prop-types';
const { SubMenu } = Menu;
const {  Sider } = Layout;
import styles from './MainLayout.less';
import {withRouter} from 'react-router-dom';


class MainLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            isTrigger: false
        };
    }
    handleClick = () => {
        const nextCollapsed = !this.state.collapsed;
        const nextTrigger = !this.state.isTrigger;
         this.setState({
             collapsed: nextCollapsed,
             isTrigger: nextTrigger
         });
         if(nextCollapsed) {
           setTimeout(() => {
             document.querySelector("#micro-app").style.width = "calc(100vw - 90px)";
           }, 100)
         } else {
           document.querySelector("#micro-app").style.width = "calc(100vw - 220px)";
         }
    }
    render() {
        const { isTrigger } = this.state;
        const { list } = this.props;
        //console.log(ReactDOM.findDOMNode(this).getElementsByClassName('ant-menu-sub').length)
        const { location: { pathname } } = this.props;
        const isNewCMS = pathname.indexOf("/cms") > -1;
        return (
            <Layout className={styles.rootContainer}>

                {/* <LayoutHeader/> */}
                <Layout className={styles.wrapper} style={{padding:0}}>
                    <Sider
                        className={styles.siderLayout}
                        collapsible
                        trigger={null}
                        collapsed={this.state.collapsed}
                    >

<div >

                        </div>
                        <LayoutMenu isTrigger={isTrigger} list={list}/>
                        <div className={styles.trigger} onClick={this.handleClick}>
                            <Icon style={{fontWeight: 'bold',color:'#BFCBD4'}} type={isTrigger ? 'right' : 'left'}/>
                        </div>
                    </Sider>


                    <Layout className={styles.contentWrapper}>
                    <LayoutHeader/>
                        {!isNewCMS && <div className={styles.breadContainer}>
                          <PathBread list={list}/>
                        </div>}
                        <LayoutContent list={list}/>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
MainLayout.propTypes = {
    list: PropTypes.array,
}
MainLayout.defaultProps = {
    list: []
};

export default withRouter(MainLayout);
