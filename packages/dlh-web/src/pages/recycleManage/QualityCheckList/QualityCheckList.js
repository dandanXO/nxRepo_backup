import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CommonTable } from 'components';
import { bindActionCreators } from 'redux';
import { qualityCheckListAction } from './index';
import SerachList from './SearchList/SearchList';
import {convertMoneyFormat} from "utils";

const convertParams = (obj) => {
    const { time = '', userPhone = '', userName = '', orderNo = '', status = '10' } = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD HH:mm:ss') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD HH:mm:ss') : '',
        userPhone,
        userName,
        orderNo,
        typeTime: '3',
        status
    };
}

const checkStatus = {
    "3": "质检通过",
    "4": "质检不通过"
}

class QualityCheckList extends Component{
    columns = [
        { title: '质检完成时间', dataIndex: 'goodsInspectTime', key: 'goodsInspectTime' },
        { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
        { title: '姓名', dataIndex: 'userName', key: 'userName' },
        { title: '手机号', dataIndex: 'userPhone', key: 'userPhone' },
        { title: '产品类型', dataIndex: 'deviceModel', key: 'deviceModel' },
        {
            title: '质检结果',
            dataIndex: 'status',
            key: 'status',
            render(text) {
                return checkStatus[text] || '';
            }
        },
        {
            title: '支付金额',
            dataIndex: 'restMoney',
            key: 'restMoney',
            render(text, record) {
                return convertMoneyFormat(text);
            }
        },
        { title: '备注', dataIndex: 'goodsInspectRemark', key: 'goodsInspectRemark' },
        { title: '质检人', dataIndex: 'goodsInspector', key: 'goodsInspector' }
    ];
    constructor(props) {
        super(props);
        this.state = {};
        this.pageSize = 10;
        this.searchParams = convertParams({});
    }

    handleSearch = (obj) => {
        console.log(obj)
        const { getTableData } = this.props;
        const params = convertParams(obj);
        this.searchParams = params;
        getTableData({ ...params, pageNum: 1, pageSize: this.pageSize });
    }

    handlePageChange = (info) => {
        const { pageSize, current } = info;
        const { getTableData } = this.props;
        getTableData({ ...this.searchParams, pageSize, pageNum: current });
    }

    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({ pageNum: 1, pageSize: this.pageSize, ...this.searchParams});
    }
    render() {
        const { tableData: { data, pagination }, loading } = this.props;
        return (
            <div>
                <SerachList handleSearch={this.handleSearch}/>
                <CommonTable
                    pagination={pagination}
                    loading={loading}
                    handlePageChange={this.handlePageChange}
                    dataSource={data}
                    columns={this.columns}
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { recycleManageState: { qualityCheckListState } } = state;
    return {
        tableData: qualityCheckListState['tableData'],
        loading: qualityCheckListState['loading']
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: qualityCheckListAction.qclGetTableData,
        setTableData: qualityCheckListAction.qclSetTableData
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QualityCheckList);
