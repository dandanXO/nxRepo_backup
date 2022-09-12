import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchList from './SearchList/SearchList';
import { CommonTable, EllipsisText, CopyText } from 'components';
import { blackListManageAction } from './index';
import moment from 'moment';
import { injectIntl,FormattedMessage } from "react-intl";
import PropTypes from 'prop-types';
import BlackModel from './BlackModel/BlackModel';
import { Button, message } from 'antd';

const convertarams = (obj = {}) => {
    const {time = [], userPhone = '', userTrueName = ''} = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        yStartTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        yEndTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        userPhone,
        userTrueName
    };
}

class BlackListManage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.pageSize = 10;
        this.searchParams = convertarams({});
        this.columns = [
            {
                title: props.intl.formatMessage({id: "page.search.list.blacklist.time"}),
                dataIndex: 'addTime',
                key: 'addTime',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: props.intl.formatMessage({id: "page.search.list.name"}),
                dataIndex: 'userTrueName',
                key: 'userTrueName',
                render(text) { return <CopyText text={text} /> }
            },
            {
                title: props.intl.formatMessage({ id: "windowPage.mobile" }),
                dataIndex: 'phoneNo',
                key: 'phoneNo',
                width: '10%'
            },
            {
                title: props.intl.formatMessage({id: "windowPage.identity.card"}),
                dataIndex: 'idcardNo',
                key: 'idcardNo',
                width: '10%'
            },
            {
                title: props.intl.formatMessage({id: "windowPage.remarks"}),
                dataIndex: 'reason',
                key: 'reason',
                width: '30%',
                render(text) {
                    let str;
                    try {
                        str = JSON.parse(text);
                    } catch (e) {
                        str = text;
                    }
                    str = typeof str !== 'object' ? str : (str['risk_items'] || []).map(item => item['risk_name']).join(',')
                    return <EllipsisText text={str}/>
                }
            },
            {
                title: props.intl.formatMessage({id: "page.table.operation.person"}),
                dataIndex: 'operatorName',
                key: 'operatorName'
            }

        ];
    }

    componentDidMount() {
        const {getTableData} = this.props;
        getTableData({pageSize: this.pageSize, pageNum: 1, ...this.searchParams});
    }

    componentWillUnmount() {
        const {setTableData} = this.props;
        setTableData({
            data: [],
            pagination: {}
        })
    }

    handleSearch = (obj) => {
        const { getTableData } = this.props;
        this.searchParams = convertarams(obj);
        getTableData({ pageSize: this.pageSize, pageNum: 1, ...this.searchParams });
    }
    handlePageChange = (info) => {
        const { current, pageSize } = info;
        const { getTableData } = this.props;
        getTableData({ pageNum: current, pageSize, ...this.searchParams });
    }

    handleModalOk = (obj) => {
        const { addBlack, intl } = this.props;
        const { phoneNo, reason } = obj;
        const isReasonError = reason && reason.split(';').filter((item) => item.length !== 10 || isNaN(item))
        const phoneNoError = phoneNo !== "0" && phoneNo.length !== 10 ? phoneNo : isReasonError;
        if (phoneNoError.length > 0 || isNaN(phoneNo)) {
            message.warning(`${isNaN(phoneNo) ? phoneNo : phoneNoError} ${intl.formatMessage({ id: `windowPage.mobile.format.incorrect` })}`);
            return;
        }
        addBlack({ ...obj, pageSize: this.pageSize, pageNum: 1, ...this.searchParams });
    }

    handleModalCancel = () => {
        const { changeModalVisible } = this.props;
        changeModalVisible(false);
    }

    render () {
        const { tableData: { data, pagination }, loading, visible, changeModalVisible } = this.props;
        return (
            <div>
                <SearchList submit={this.handleSearch} />
                <div>
                    <Button type={"primary"} onClick={() => changeModalVisible(true)}><FormattedMessage id="page.table.add" /></Button>
                </div>
                <CommonTable
                    handlePageChange={this.handlePageChange}
                    columns={this.columns}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                />
                <BlackModel visible={visible} handleOk={this.handleModalOk} handleCancel={this.handleModalCancel}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {windControlCheckState: {blackListManageState}} = state;
    return {
        tableData: blackListManageState['data'],
        loading: blackListManageState['loading'],
        visible: blackListManageState['visible']
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: blackListManageAction.blmGetTableData,
        setTableData: blackListManageAction.blmSetTableData,
        addBlack: blackListManageAction.blmAddTableData,
        changeModalVisible: blackListManageAction.blmChangeModalVisible
    }, dispatch)
}

BlackListManage.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BlackListManage));