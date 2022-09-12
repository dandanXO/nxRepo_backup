import React, { Component } from 'react';
import { Modal, Button, Popconfirm } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { CommonTable } from 'components';
import { orderStatus } from 'utils';
import {injectIntl, FormattedMessage} from "react-intl";

class AuthModal extends Component{

    constructor(props) {
        super(props);
        this.state = {};
        this.columns = [
            { title: this.props.intl.formatMessage({id : "page.search.list.name"}), dataIndex: 'userName', key: 'userName' },
            { title: this.props.intl.formatMessage({id : "page.search.list.mobile"}), dataIndex: 'phoneNo', key: 'phoneNo' },
            { title: this.props.intl.formatMessage({id : "windowPage.user.operator.auth"}), dataIndex: 'statusYys', key: 'statusYys' },
            { title: this.props.intl.formatMessage({id : "taskId"}), dataIndex: 'taskId', key: 'taskId' },
            {
                title: this.props.intl.formatMessage({id : "page.table.start.time"}),
                dataIndex: 'addTime',
                key: 'addTime',
                render(text) {
                    if(!text['time']) {
                        return '';
                    }
                    return moment(Number(text['time'])).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            { title: this.props.intl.formatMessage({id : "windowPage.operator.data"}), dataIndex: 'reportStatus', key: 'reportStatus' },
        ]
    }

    renderBtn = () => {
        const { modalData, handleCheck, handleReset, intl } = this.props;
        if(modalData.length === 0) {
            return null;
        }
        const isShowResetBtn = modalData.every(item => item['statusYys'] == intl.formatMessage({id : "windowPage.auth"}) && item['reportStatus'] ==  intl.formatMessage({id : "windowPage.callback.fail"}));
        const isShowCheckBtn = modalData.length > 0 && modalData[0]['statusYys'] == intl.formatMessage({id : "windowPage.auth"}) && modalData[0]['reportStatus'] == intl.formatMessage({id : "windowPage.callback.fail"});
        return (
            <div>
                {
                    isShowResetBtn &&
                    <Popconfirm title={intl.formatMessage({id : "windowPage.please.confirm.reset"})} onConfirm={handleReset}>
                        <Button type={'primary'}><FormattedMessage id="windowsPage.reset.operator.auth" /></Button>
                    </Popconfirm>
                }
                {
                    isShowCheckBtn && <Button type={'primary'} onClick={handleCheck}><FormattedMessage id="windowPage.manual.examination" /></Button>
                }
            </div>
        );
    }

    render() {
        const { visible, afterClose, modalData, handleCancel, intl } = this.props;
        return (
            <Modal
                footer={null}
                width={1000}
                visible={visible}
                onCancel={handleCancel}
                afterClose={afterClose}
                title={intl.formatMessage({id : "windowPage.auth.info"})}>
                <div>
                    {
                        this.renderBtn()
                    }
                    <CommonTable
                        columns={this.columns}
                        loading={false}
                        pagination={null}
                        dataSource={modalData}
                    />
                </div>
            </Modal>
        );
    }

}

AuthModal.propTypes = {
    visible: PropTypes.bool,
    modalData: PropTypes.array,
    afterClose: PropTypes.func,
    handleCancel: PropTypes.func,
    handleReset: PropTypes.func,
    handleCheck: PropTypes.func,
    intl: PropTypes.object.isRequired,
};
AuthModal.defaultProps = {
    visible: false,
    modalData: {},
    afterClose() {},
    handleCancel() {},
    handleReset() {},
    handleCheck() {}
};
export default injectIntl(AuthModal);