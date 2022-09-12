import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { CommonTable, CopyText } from 'components';
import {operationLogManageAction} from "./index";
import SearchList from './SearchList/SearchList';
import moment from "moment/moment";
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";


const convertParams = (time) => {
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : ''
    };
}


class OperationLogManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: [moment().subtract(9, 'days'), moment()],
            info: {}
        };
        this.pageSize = 10;
        this.modifyId = '';
        this.searchParams = {};
        const _this = this;
        this.columns = [
            { title: props.intl.formatMessage({ id: "page.table.operation.people" }), dataIndex: 'operator', key: 'operator', width: '10%' },
            { title: props.intl.formatMessage({ id: "page.table.operation.types" }), dataIndex: 'name', key: 'name', width: '12%' },
            {
                title: props.intl.formatMessage({ id: "page.table.operation.time" }), dataIndex: 'operationTime', key: 'operationTime', width: '15%',
                render(text) {
                    return moment(text).format("YYYY-MM-DD HH:mm:ss");
                }
            },
            { title: props.intl.formatMessage({ id: "page.table.ip" }), dataIndex: 'ip', key: 'ip', width: '12%', render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({ id: "page.table.ip.area" }), dataIndex: 'ipAddress', key: 'ipAddress', width: '12%', render(text) { return <CopyText text={text} /> } },
            {
                title: props.intl.formatMessage({ id: "page.table.operation.parameter" }), dataIndex: 'requestParam', key: 'requestParam',
                render(text) {
                    return <CopyText text={text} isEllispsis={true} />
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.operation.result" }), dataIndex: 'returnInfo', key: 'returnInfo',
                render(text) {
                    return <CopyText text={text} isEllispsis={true} />
                }
            },
        ];
    }


    handlePageChange = (info) => {
        const {current, pageSize} = info;
        const {getTableData} = this.props;
        getTableData({pageNum: current, pageSize, ...this.searchParams});

    }


    submit = (obj) => {
        const {time = []} = obj;
        const params = convertParams(time);
        params.type = obj.type;
        params.phoneNo = obj.phoneNo;
        this.searchParams = params;

        const {getTableData} = this.props;
        getTableData({...params, pageSize: this.pageSize, pageNum: 1})
    }

    componentDidMount() {
        const {getTableData, getMappingListData} = this.props;
        getTableData({pageSize: this.pageSize, pageNum: 1, ...this.searchParams});
        getMappingListData({});
    }

    render() {
        const {tableData: {data, pagination}, loading, mappingListData} = this.props;
        return (
            <div>
                <SearchList mappingListData={mappingListData} submit={this.submit}/>
                <CommonTable columns={this.columns} dataSource={data} pagination={pagination} loading={loading} handlePageChange={this.handlePageChange}/>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const {systemManageState: {operationLogManageState}} = state;
    return {
        tableData: operationLogManageState['tableData'],
        loading: operationLogManageState['loading'],
        mappingListData: operationLogManageState['mappingListData'],
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: operationLogManageAction.olmgGetTableData,
        setTableData: operationLogManageAction.olmgSetTableData,
        getMappingListData: operationLogManageAction.olmgGetMappingListData,
    }, dispatch);
}

OperationLogManage.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OperationLogManage));