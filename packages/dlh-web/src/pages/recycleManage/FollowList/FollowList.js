import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CommonTable } from 'components';
import moment from 'moment';
import { followListAction } from './index';

const orderStatus = {
    "5": '已提交催收',
    "6": "已支付尾款",
    "7": "待退货"
}

class FollowList extends Component{
    columns = [
        {
            title: '跟进完成时间',
            dataIndex: 'customerWaitTime',
            key: 'customerWaitTime',
            render(text) {
                return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
        { title: '姓名', dataIndex: 'userName', key: 'userName' },
        { title: '手机号', dataIndex: 'userPhone', key: 'userPhone' },
        {
            title: '跟进状态',
            dataIndex: 'status',
            key: 'status',
            render(text) {
                return orderStatus[text] || '';
            }
        },
        { title: '备注', dataIndex: 'customerDealRemak', key: 'customerDealRemak' },
        { title: '操作人', dataIndex: 'customerWaiter', key: 'customerWaiter' }
    ];
    constructor(props) {
        super(props);
        this.state = {};
        this.searchParams = {
            timeType: '4',
            status: '11'
        };
        this.pageSize = 10;
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
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} loading={loading} pagination={pagination} dataSource={data}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { recycleManageState: { followListState } } = state;
    return {
        tableData: followListState['tableData'],
        loading: followListState['loading']
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: followListAction.fwlGetTableData,
        setTableData: followListAction.fwlSetTableData
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowList);