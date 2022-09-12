import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { overdueStandOverRecordAction } from './index';
import SearchList from './SearchList/SearchList';
import { CommonTable } from 'components';
import {convertMoneyFormat} from "utils";

class OverdueStandOverRecord extends Component{
    columns = [
        { title: '展期时间', dataIndex: 'standOverTime', key: 'standOverTime' },
        { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '手机号', dataIndex: 'phoneNo', key: 'phoneNo' },
        {
            title: '借款金额',
            dataIndex: 'lendMoney',
            key: 'lendMoney',
            render(text, record) {
                return convertMoneyFormat(text);
            }
        },
        {
            title: '展期费用',
            dataIndex: 'standOverMoney',
            key: 'standOverMoney',
            render(text, record) {
                return convertMoneyFormat(text);
            }
        },
        {
            title: '缴纳滞纳金',
            dataIndex: 'lateFees',
            key: 'lateFees',
            render(text, record) {
                return convertMoneyFormat(text);
            }
        },
        { title: '逾期时间', dataIndex: 'overdueTime', key: 'overdueTime' }
    ];
    constructor(props) {
        super(props);
        this.state = {};
    }

    handlePageChange = (info) => {

    }
    handleSearch = (obj) =>{
        console.log(obj);

    }

    render() {
        const { tableData: { data, pagination }, loading } = this.props;
        return (
            <div>
                <SearchList handleSubmit={this.handleSearch}/>
                <CommonTable
                    columns={this.columns}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    handlePageChange={this.handlePageChange}
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { afterLoanManageState: { overdueStandOverRecordState } } = state;
    return {
        tableData: overdueStandOverRecordState['data'],
        loading: overdueStandOverRecordState['loading']
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: overdueStandOverRecordAction.osrGetTableData,
        setTableData: overdueStandOverRecordAction.osrSetTableData
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(OverdueStandOverRecord);