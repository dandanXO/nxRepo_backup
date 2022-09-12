import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Tooltip } from 'antd';
import { bindActionCreators } from 'redux';
import SearchList from './SearchList/SearchList';
import RiskFeeModel from './RiskFeeModel/RiskFeeModel';
import { CommonTable } from 'components';
import { riskFeeDepositManageAction } from './index';
import styles from './RiskFeeDepositManage.less';
import moment from 'moment';
import {convertMoneyFormat} from "utils";

const convertarams = (obj = {}) => {
    const { time = [], phoneNo = '', nameTrue = '' , resonType = ''} = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        yStartTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        yEndTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        phoneNo,
        nameTrue,
        resonType: 0
    };
}

const resonTypeName = {
    0: '手续费充值'
}

class RiskFeeDepositManage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            itemRiskFeelId:null
        };
        const _this = this;
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
                title: '充值金额',
                dataIndex: 'tradeAmount',
                key: 'tradeAmount',
                render(text, record) {
                    return convertMoneyFormat(text);
                }
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

    handleSearch = (obj) => {
        const { getTableData } = this.props;
        const params = convertarams(obj);
        getTableData({ pageSize: this.pageSize, pageNum: 1, ...params });
    }
    handlePageChange = (info) => {
        const { current, pageSize } = info;
        const { getTableData } = this.props;
        getTableData({ pageNum: current, pageSize, ...this.searchParams });
    }

    //充值
    handleAddRiskFee = () => {
        const { changeModalVisible, changeModalInfo, info } = this.props;
        this.setState({ itemRiskFeelId: null });
        changeModalVisible(true);
        changeModalInfo({  tradeAmount: '', remark: '' });
    }

    handleModalCancel = () => {
        const { changeModalVisible } = this.props;
        changeModalVisible(false);
    }

    handleModalOk = (obj) => {
        const { itemRiskFeelId } = this.state;
        const { addRiskFee } = this.props;
        if(itemRiskFeelId) {
            //updateRiskFee({ ...obj, id: itemRiskFeelId });
            return;
        }
        addRiskFee(obj);
    }


    render() {
        const { tableData: { data, pagination }, loading , visible, info} = this.props;
        return (
            <div>
                <SearchList submit={this.handleSearch}/>
                <Button type={'primary'} onClick={this.handleAddRiskFee}>充值</Button>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading}/>
                <RiskFeeModel visible={visible} info={info} handleCancel={this.handleModalCancel} handleOk={this.handleModalOk}/>
         
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { riskFeeManageState: { riskFeeDepositManageState } } = state;
    return {
        tableData: riskFeeDepositManageState['data'],
        loading: riskFeeDepositManageState['loading'],
        visible: riskFeeDepositManageState['visible'],
        info: riskFeeDepositManageState['modalInfo']
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: riskFeeDepositManageAction.rfm2GetTableData,
        setTableData: riskFeeDepositManageAction.rfm2SetTableData,
        changeModalVisible: riskFeeDepositManageAction.rfm2ChangeModalVisible,
        changeModalInfo: riskFeeDepositManageAction.rfm2ChangeModalInfo,
        addRiskFee: riskFeeDepositManageAction.rfm2AddTableData,
    },dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(RiskFeeDepositManage);