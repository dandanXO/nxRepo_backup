import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { CommonTable } from 'components';
import { salesReturnListAction } from "./index";

class SalesReturnList extends  Component{
    columns = [
        {
            title: '退货时间',
            dataIndex: 'goodsRefundTime',
            key: 'goodsRefundTime',
            render(text) {
                if(!text) {
                    return null;
                }
                return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
        { title: '姓名', dataIndex: 'userName', key: 'userName' },
        { title: '手机号', dataIndex: 'userPhone', key: 'userPhone' },
        { title: '产品类型', dataIndex: 'deviceModel', key: 'deviceModel' },
        { title: '快递公司', dataIndex: 'goodsRefundExpressCompany', key: 'goodsRefundExpressCompany' },
        { title: '快递单号', dataIndex: 'goodsRefundExpressNo', key: 'goodsRefundExpressNo' },
        { title: '操作人', dataIndex: 'goodsRefunder', key: 'goodsRefunder' }
    ];
    constructor(props) {
        super(props);
        this.state = {};
        this.searchParams = {
            // status: '8'
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
                <CommonTable columns={this.columns} dataSource={data} pagination={pagination} loading={loading}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { recycleManageState: { salesReturnListState } } = state;
    return {
        tableData: salesReturnListState['tableData'],
        loading: salesReturnListState['loading']
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: salesReturnListAction.srlGetTableData,
        setTableData: salesReturnListAction.srlChangeTableLoading
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesReturnList);