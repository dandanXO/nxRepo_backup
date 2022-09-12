import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Layout } from 'antd';
import styles from './LayoutContent.less';
import Routes from '../../routes';
const { Content } = Layout;

export default class LayoutContent extends Component {

    render() {
        return (
            <Content className={styles.content}>
                <div className={styles.innerContent}>
                    <Routes list={this.props.list}/>
                </div>
            </Content>
        );
    }
}

LayoutContent.propTypes = {
    list: PropTypes.array
};
LayoutContent.defaultProps = {
    list: []
};