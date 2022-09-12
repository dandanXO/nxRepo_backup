import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Button , message} from 'antd';
import { bindActionCreators } from 'redux';
import SearchList from './SearchList/SearchList';
import { CommonTable } from 'components';
import { riskFeeListManageAction } from './index';
import {axios} from "utils";
import styles from './RiskFeeListManage.less';
import moment from 'moment';
import download from "downloadjs";
const convertarams = (obj = {}) => {
    const { time = [], phoneNo = '', nameTrue = '' , resonType = ''} = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        yStartTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        yEndTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        phoneNo,
        nameTrue,
        resonType: resonType.length > 0 ? resonType : '-1'
    };
}

const resonTypeName = {
    0: '手续费充值',
    1: '身份认证全流程',
    2: '芝麻分',
    3: '黑名单03',
    4: '运营商01',
    5: '模型分01',
    6: '模型分02',
    7: '黑名单01',
    8: '黑名单04',
    9: '黑名单02',
    10: '黑名单05'
}

class RiskFeeListManage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            btnDisabled: false
        };
        this.searchStatus = {};
        this.pageSize = 10;
        this.searchParams = convertarams({});
        this.columns = [
            {
                title: '记录时间',
                dataIndex: 'addTime',
                key: 'addTime',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: '姓名',
                dataIndex: 'nameTrue',
                key: 'nameTrue'
            },
            {
                title: '手机号码',
                dataIndex: 'phoneNo',
                key: 'phoneNo'
            },
            {
                title: '业务类型',
                dataIndex: 'resonType',
                key: 'resonType',
                render(text) {
                    return resonTypeName[text];
                }
            },
            {
                title: '当前余额',
                dataIndex: 'balance',
                key: 'balance'
            },
            {
                title: '费用',
                dataIndex: 'tradeAmount',
                key: 'tradeAmount'
            },
            {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
                width: '20%',
                render(text) {
                    let str;
                    try {
                        str = JSON.parse(text);
                    } catch (e) {
                        str = text;
                    }

                    if (typeof str !== 'object') {
                        return str;
                    }
                    let arr = (str['risk_items'] || []).map(item => item['risk_name']);
                    return arr.join(',');
                }
            }
        ];
    }
    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({ pageSize: this.pageSize, pageNum: 1, ...this.searchParams });
    }

    componentWillUnmount() {
        const { setTableData } = this.props;
        setTableData({
            data: [],
            pagination: {}
        })
    }

    handleSearch = obj => {
        const { getTableData } = this.props;
        const { time } = obj;
        const isArr = Array.isArray(time) && time.length > 0;
        const params = {
            ...obj,
            yStartTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
            yEndTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        };
        delete params['time'];
        this.searchStatus = params;
        getTableData({ ...params, pageNum: 1, pageSize: this.pageSize });
    };

    handlePageChange = (info) => {
        const { current, pageSize } = info;
        const { getTableData } = this.props;
        getTableData({ pageNum: current, pageSize, ...this.searchParams });
    }

     //导出记录
    exportRecord = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading('正在导出', 0);
        const _this = this;
        axios({
            url: '/hs/admin/riskFee/download',
            method: 'post',
            responseType: 'blob',
            data: _this.searchStatus
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, `风控费用清单${Date.now()}.xlsx`);
        }).catch(() => {
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }

    render() {
        const { tableData: { data, pagination }, loading } = this.props;
        const { btnDisabled } = this.state;
        return (
            <div>
                <SearchList submit={this.handleSearch}/>
                <div><Button type={'danger'} disabled={btnDisabled} onClick={this.exportRecord}>导出记录</Button></div>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { riskFeeManageState: { riskFeeListManageState } } = state;
    return {
        tableData: riskFeeListManageState['data'],
        loading: riskFeeListManageState['loading']
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: riskFeeListManageAction.rfmGetTableData,
        setTableData: riskFeeListManageAction.rfmSetTableData
    },dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(RiskFeeListManage);