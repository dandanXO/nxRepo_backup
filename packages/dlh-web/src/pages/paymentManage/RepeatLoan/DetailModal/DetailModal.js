import React, { Component } from 'react';
import { Modal } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { CommonTable } from 'components';
import { orderStatus } from 'utils';
import {injectIntl, FormattedMessage} from "react-intl";

const loanStatus = {
    0: '放款中',
    1: '放款成功',
    4: '放款失败',
    5: '待确认'
}
class DetailModal extends Component{

    constructor(props) {
        super(props);
        this.state = {};
        this.columns = [
            { title: props.intl.formatMessage({id :"page.search.list.order.no"}), dataIndex: 'orderNo', key: 'orderNo' },
            { title: props.intl.formatMessage({id :"page.search.list.name"}), dataIndex: 'userName', key: 'userName' },
            { title: props.intl.formatMessage({id :"page.search.list.mobile"}), dataIndex: 'userPhone', key: 'userPhone' },
            { title: props.intl.formatMessage({id :"page.search.list.product.name"}), dataIndex: 'productName', key: 'productName' },
            { title: props.intl.formatMessage({id :"page.table.appName"}), dataIndex: 'appName', key: 'appName' },
            { title: props.intl.formatMessage({id :"page.table.paymentPlatformName"}), dataIndex: 'paymentPlatform', key: 'paymentPlatform' },
            {
                title: props.intl.formatMessage({id :"page.table.start.time"}),
                dataIndex: 'addTime',
                key: 'addTime',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: props.intl.formatMessage({id :"page.search.list.order.status"}),
                dataIndex: 'loanState',
                key: 'loanState',
                render(text) {
                    return loanStatus[text]
                }
            },
            { title: props.intl.formatMessage({id :"windowPage.remarks"}), dataIndex: 'remark', key: 'remark', width: '300px' },
        ]
    }
    render() {
        const { visible, afterClose, modalData: { data, pagination }, modalLoading, handlePageChange, handleCancel, intl } = this.props;
        return (
            <Modal
                footer={null}
                width={1000}
                visible={visible}
                onCancel={handleCancel}
                afterClose={afterClose}
                title={intl.formatMessage({id : "windowPage.loan.hist.details"})}>
                <div>
                    <CommonTable
                        columns={this.columns}
                        loading={modalLoading}
                        pagination={pagination}
                        dataSource={data}
                        pageSize={10}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </Modal>
        );
    }

}

DetailModal.propTypes = {
    visible: PropTypes.bool,
    modalData: PropTypes.object,
    modalLoading: PropTypes.bool,
    afterClose: PropTypes.func,
    handlePageChange: PropTypes.func,
    handleCancel: PropTypes.func,
    intl: PropTypes.object.isRequired,
};
DetailModal.defaultProps = {
    visible: false,
    modalData: {},
    modalLoading: false,
    afterClose() {
    },
    handlePageChange() {
    },
    handleCancel() {

    }
};
export default injectIntl(DetailModal);
