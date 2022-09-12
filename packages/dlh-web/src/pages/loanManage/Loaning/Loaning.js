import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchList from './SearchList/SearchList';
import { CommonTable } from 'components';
import { loaningAction } from './index';
import {convertMoneyFormat} from "utils";

class Loaning extends React.Component {
    columns =[
        { title: '订单号', dataIndex: 'orderNumber', key: 'orderNumber' },
        { title: '回收状态', dataIndex: 'giveBackOption', key: 'giveBackOption' },
        { title: '用户id', dataIndex: 'useId', key: 'userId' },
        { title: '产品类型', dataIndex: 'productType', key: 'productType' },
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '手机号码', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: '身份证号', dataIndex: 'idCard', key: 'idCard' },
        {
            title: '待还金额',
            dataIndex: 'giveBackMoney',
            key: 'giveBackMoney',
            render(text, record) {
                return convertMoneyFormat(text);
            }
        },
        { title: '借款期限', dataIndex: 'loanDeadLine', key: 'loanDeadLine' },
        { title: '到期还款时间', dataIndex: 'expireTime', key: 'expireTime' },
        { title: '渠道部门', dataIndex: 'source', key: 'source' },
        { title: '状态', dataIndex: 'option', key: 'option' }
    ]

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({});
    }

    componentWillUnmount() {
        const { setTableData } = this.props;
        setTableData({
            data: [],
            pagination: {}
        })
    }

    render() {
        const { tableData: { data, pagination }, loading } = this.props;
        return (
            <div>
                <SearchList/>
                <CommonTable columns={this.columns} dataSource={data} pagination={pagination} loading={loading}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { loanManageState: { loaningState } } = state;
    return {
        tableData: loaningState['data'],
        loading: loaningState['loading']
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: loaningAction.loiGetTableData,
        setTableData: loaningAction.loiSetTableData
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Loaning);