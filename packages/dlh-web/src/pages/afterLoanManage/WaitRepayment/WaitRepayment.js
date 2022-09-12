import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SearchList from './SearchList/SearchList';
import {CommonTable} from 'components';
import {waitRepaymentAction} from './index';
import {convertMoneyFormat} from "utils";

class WaitRepayment extends Component {
    columns = [
        {title: '订单号', dataIndex: 'orderNumber', key: 'orderNumber'},
        {title: '回收状态', dataIndex: 'giveBackOption', key: 'giveBackOption'},
        {title: '用户id', dataIndex: 'useId', key: 'userId'},
        {title: '产品类型', dataIndex: 'productType', key: 'productType'},
        {title: '姓名', dataIndex: 'name', key: 'name'},
        {title: '手机号码', dataIndex: 'phoneNumber', key: 'phoneNumber'},
        {title: '身份证号', dataIndex: 'idCard', key: 'idCard'},
        {
            title: '待还金额',
            dataIndex: 'giveBackMoney',
            key: 'giveBackMoney',
            render(text, record) {
                return convertMoneyFormat(text);
            }
        },
        {title: '借款期限', dataIndex: 'loanDeadLine', key: 'loanDeadLine'},
        {title: '到期还款时间', dataIndex: 'expireTime', key: 'expireTime'},
        {title: '渠道部门', dataIndex: 'source', key: 'source'},
        {title: '状态', dataIndex: 'option', key: 'option'}
    ]

    constructor(props) {
        super(props);
        this.state = {};

    }

    componentDidMount() {
        const {getTableData} = this.props;
        getTableData({});
    }

    componentWillUnmount() {
        const {setTableData} = this.props;
        setTableData({
            data: [],
            pagination: {}
        })
    }

    render() {
        const {tableData: {data, pagination}, loading} = this.props;
        const pageInfo = {...pagination, pageSizeOptions: ['10', '20', '30', '40', '50', "100", "200", "300", "400", "500", "1000", "2000", "5000"], showSizeChanger: true}
        return (
            <div>
                <SearchList/>
                <CommonTable columns={this.columns} loading={loading} dataSource={data} pagination={pageIn}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {afterLoanManageState: {waitRepaymentState}} = state;
    return {
        tableData: waitRepaymentState['data'],
        loading: waitRepaymentState['loading']
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: waitRepaymentAction.wrmGetTableData,
        setTableData: waitRepaymentAction.wrmSetTableData
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(WaitRepayment);