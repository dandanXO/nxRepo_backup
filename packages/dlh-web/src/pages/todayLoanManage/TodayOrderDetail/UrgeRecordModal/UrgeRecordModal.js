import React, { Component } from 'react';
import { Modal } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { CommonTable } from 'components';

import {injectIntl} from "react-intl";
import {FormattedMessage} from "react-intl";


const urgeRecordColumns = [
    {
        title: <FormattedMessage id='windowPage.add.time' />,
        dataIndex: 'createTime',
        key: 'createTime',
        render(text) {
            return moment(text).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    { title: <FormattedMessage id='windowPage.collect.remark' />, dataIndex: 'remark', key: 'remark' },
    { title: <FormattedMessage id='windowPage.collector' />, dataIndex: 'collectorname', key: 'collectorname' }
];

class UrgeRecordModal extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { visible, handleCancel, tableData,intl } = this.props;
        return (
            <Modal
                onCancel={handleCancel}
                width={600}
                visible={visible}
                footer={null}
                title={intl.formatMessage({id : "windowPage.collect.record"})}
            >
                <div>
                    <CommonTable columns={urgeRecordColumns} dataSource={tableData}/>
                </div>
            </Modal>
        );
    }
}
UrgeRecordModal.propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    tableData: PropTypes.array,
    intl: PropTypes.object.isRequired,
};
UrgeRecordModal.defaultProps = {
    visible: false,
    handleCancel(){},
    tableData: []
};

export default injectIntl(UrgeRecordModal);