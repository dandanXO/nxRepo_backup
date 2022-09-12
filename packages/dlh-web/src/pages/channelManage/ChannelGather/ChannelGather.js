import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CommonTable } from 'components';
import SearchList from './SearchList/SearchList';
import { channelGatherAction } from './index';
import { convertMoneyFormat } from "utils";

class ChannelGather extends Component {
    columns = [
        {
            title: '时间',
            dataIndex: 'time',
            key: 'time'
        },
        {
            title: '注册数量',
            dataIndex: 'registerNum',
            key: 'registerNum',
        },
        {
            title: '申请数量',
            dataIndex: 'applyNum',
            key: 'applyNum'
        },
        {
            title: '放款笔数',
            dataIndex: 'loanNum',
            key: 'loanNum'
        },
        {
            title: '放款金额',
            dataIndex: 'loanMoney',
            key: 'loanMoney',
            render(text, record) {
                return convertMoneyFormat(text);
            }
        },
        {
            title: '逾期笔数',
            dataIndex: 'overdueNum',
            key: 'overdueNum'
        },
        {
            title: '逾期金额',
            dataIndex: 'overdueMoney',
            key: 'overdueMoney',
            render(text, record) {
                return convertMoneyFormat(text);
            }
        }
    ]
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({});
    }

    render() {
        const { tableData: { data, pagination }, loading } = this.props;
        return (
            <div>
                <SearchList/>
                <CommonTable dataSource={data} pagination={pagination} loading={loading} columns={this.columns}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { channelManageState: { channelGatherState } } = state;
    return {
        tableData: channelGatherState['data'],
        loading: channelGatherState['loading']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: channelGatherAction.cGGetTableData
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelGather)