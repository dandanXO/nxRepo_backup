import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Layout } from 'antd';
import styles from './LayoutContent.less';
import Routes from '../../routes';
import {WatermarkPhoto} from "../../components/WatermarkPhoto/WatermarkPhoto";
const { Content } = Layout;

export default class LayoutContent extends Component {

    render() {
        return (
            <Content className={styles.content} style={{
              // backgroundImage: "url(https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000)",
              // backgroundSize: "cover",
              // backgroundRepeat: "no-repeat",
            }}>

                <div className={styles.innerContent}>
                  <WatermarkPhoto>
                    <Routes list={this.props.list}/>
                  </WatermarkPhoto>
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
