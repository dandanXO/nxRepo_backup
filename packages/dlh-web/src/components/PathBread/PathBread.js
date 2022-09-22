import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";
// import {adminRoutesPath} from "../../import/AdminModule";
import {adminRoutesPath} from "../../import/CMSModule";

// import list from '../../layouts/LayoutMenu/menuConfig';
class PathBread extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    renderBread = () => {
        const { location: { pathname }, list } = this.props;
        // FIXME:
        if(adminRoutesPath.indexOf(pathname) > -1) {
          return null
        }
        const res = this.findTitle(pathname, list);
        if(res.length < 2) {
            return null;
        }
        const ele = res.map((item, index) => <Breadcrumb.Item key={index}><FormattedMessage id={String(item).trim()} /></Breadcrumb.Item>);
        return (
            <Breadcrumb>
                <Breadcrumb.Item><Link style={{color: '#40a9ff'}} to={'/index'}><FormattedMessage id="menu.homePage" /></Link></Breadcrumb.Item>
                {ele}
            </Breadcrumb>
        );

    }

    findTitle = (pathName, list) => {
        const isArr = Array.isArray(list) && list.length > 0;
        if(isArr) {
            for (let i = 0, len = list.length; i < len; i++) {
                const current = list[i];

                if(current['actionUrl'] === pathName) {
                    return [current['name']];
                }
                const children = current['children'];
                const res = this.findTitle(pathName, children);
                if(res.length > 0) {
                    return [current['name']].concat(res);
                }
            }
            return [];
        }
        return [];
    }

    render() {
        return this.renderBread();
    }
}

PathBread.propTypes = {
    list: PropTypes.array,
};
PathBread.defaultProps = {
    list:[]
};

export default withRouter(PathBread);
