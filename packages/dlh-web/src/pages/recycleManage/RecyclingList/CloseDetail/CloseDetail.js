import React, { Component } from 'react';
import { Modal, Row, Col,Card } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './CloseDetail.less';
const receiveStatus = {
    "0": "邮寄中",
    "1": "已关闭"
}

export default class CloseDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { visible, handleCancel, info } = this.props;
        return (
            <Modal
                onCancel={handleCancel}
                width={800}
                visible={visible}
                footer={null}
                title={'查看详情'}
            >
                <div>
                    <Row gutter={24}>
                        <Col className={styles.col} span={8}>订单号：{info.orderNo || ''}</Col>
                        <Col className={styles.col} span={8}>姓名：{info.userName || ''}</Col>
                        <Col className={styles.col} span={8}>手机号：{info.userPhone || ''}</Col>
                        <Col
                            className={styles.col}
                            span={8}
                        >
                            寄回时间：{info['expressSendTime'] ? moment(Number(info['expressSendTime']) * 1000).format('YYYY-MM-DD HH:mm:ss') : ''}
                        </Col>
                        <Col className={styles.col} span={8}>产品类型：{info['deviceModel'] || ''}</Col>
                        <Col className={styles.col} span={8}>回收状态：{receiveStatus[info['status']] || ''}</Col>
                        <Col className={styles.col} span={8}>快递公司：{info['expressCompany'] || ''}</Col>
                        <Col className={styles.col} span={8}>快递单号：{info['expressNo'] || ''}</Col>
                        <Col className={styles.col} span={8}>操作人：{info['expressReceiver'] || ''}</Col>
                        <Col
                            className={styles.col}
                            span={8}
                        >
                            操作时间：{info['expressReceiveTime'] ? moment(Number(info['expressReceiveTime']) * 1000).format('YYYY-MM-DD HH:mm:ss') : ''}
                        </Col>
                        <Col className={styles.col} span={8}>拒绝原因：{info['expressRefusedReason'] || ''}</Col>
                        <Col className={styles.col} span={8}>备注：{info['expressRefusedRemark'] || ''}</Col>
                    </Row>
                </div>
            </Modal>
        );
    }
}

CloseDetail.propTypes = {
    visible: PropTypes.bool,
    info: PropTypes.object,
    handleCancel: PropTypes.func
};
CloseDetail.defaultProps = {
    visible: false,
    info: {},
    handleCancel(){}
};



