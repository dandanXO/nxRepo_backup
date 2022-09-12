import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, message, Tooltip} from 'antd';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import { CommonTable } from 'components';
import { bindActionCreators } from 'redux';
import { assetDetailListAction } from './index';
import styles from './assetDetailList.less';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { axios, convertMoneyFormat } from 'utils';
import download from "downloadjs";

class AssetDetailList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalAssetBalance:0,
            incomeTotalBalance:0,
            expenseTotalBalance:0,
            btnDisabled: false,
        };
        const _this = this;
        this.columns =[
            {
                title: '订单号',
                dataIndex: 'orderNo',
                key: 'orderNo',
                render(text) {
                    return (
                        <div>
                            <span>{text}</span>
                            <CopyToClipboard text={text} onCopy={_this.onCopy}>
                                <Tooltip title={'点击复制'}>
                                    <span style={{marginLeft: '20px'}}></span>
                                </Tooltip>
                            </CopyToClipboard>
                        </div>

                    );
                }
            },{
                title: '商户号',
                dataIndex: 'mchNo',
                key: 'mchNo',
                render(text) {
                    return (
                        <div>
                            <span>{text}</span>
                            <CopyToClipboard text={text} onCopy={_this.onCopy}>
                                <Tooltip title={'点击复制'}>
                                    <span style={{marginLeft: '20px'}}></span>
                                </Tooltip>
                            </CopyToClipboard>
                        </div>

                    );
                }
            },{
                title: '平台订单号',
                dataIndex: 'platNo',
                key: 'platNo',
                render(text) {
                    return (
                        <div>
                            <span>{text}</span>
                            <CopyToClipboard text={text} onCopy={_this.onCopy}>
                                <Tooltip title={'点击复制'}>
                                    <span style={{marginLeft: '20px'}}></span>
                                </Tooltip>
                            </CopyToClipboard>
                        </div>

                    );
                }
            },{
                title: '平台名称',
                dataIndex: 'platName',
                key: 'platName',
                render(text) {
                    return (
                        <div>
                            <span>{text}</span>
                            <CopyToClipboard text={text} onCopy={_this.onCopy}>
                                <Tooltip title={'点击复制'}>
                                    <span style={{marginLeft: '20px'}}></span>
                                </Tooltip>
                            </CopyToClipboard>
                        </div>

                    );
                }
            },{
                title: '商户名称',
                dataIndex: 'mchName',
                key: 'mchName',
                render(text) {
                    return (
                        <div>
                            <span>{text}</span>
                            <CopyToClipboard text={text} onCopy={_this.onCopy}>
                                <Tooltip title={'点击复制'}>
                                    <span style={{marginLeft: '20px'}}></span>
                                </Tooltip>
                            </CopyToClipboard>
                        </div>

                    );
                }
            },{
                title: '金额',
                dataIndex: 'payAmount',
                key: 'payAmount',
                render(text) {
                    var showStr = !isNaN(text) ? (text/100).toFixed(2) : '';
                    return (
                        <span>{showStr}</span>
                    );
                }
            },{
                title: '资金类型',
                dataIndex: 'assetType',
                key: 'assetType',
                render(text) {
                    return text == 'P'? "收入":"支出";
                }
            },{
                title: '发起时间',
                dataIndex: 'assetTime',
                key: 'assetTime',
                render(text) {
                    return moment(Number(text)).format('YYYY-MM-DD HH:mm:ss');
                }
            },{
                title: '完成时间',
                dataIndex: 'finishTime',
                key: 'finishTime',
                render(text) {
                    return moment(Number(text)).format('YYYY-MM-DD HH:mm:ss');
                }
            }
        ];
        this.searchParams = {};
    }


    handleSearch = (obj) => {
        let { finishTime, createTime, platNo, mchNo, platName,orderNo, mchName,assetType } = obj;
        const { getTableData } = this.props;
        let startFinishDate = '', endFinishDate = '', startDate = '', endDate = '';
        if(Array.isArray(finishTime)) {
            [startFinishDate, endFinishDate] = finishTime.map(item => item.format('YYYY-MM-DD'));
        }
        if(Array.isArray(createTime)) {
            [startDate, endDate] = createTime.map(item => item.format('YYYY-MM-DD'));
        }
        const params = { platNo, mchNo, platName,orderNo, mchName,assetType, startFinishDate, endFinishDate, startDate, endDate , pageSize: 10, pageNum: 1 };
        this.searchParams = params;
        getTableData(params);
    }

    //导出资金明细
    exportAssetDetailOrder = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading('正在导出', 0);
        const params = { ...this.searchParams, pageNum:1, pageSize:1000000 };
        axios({
            url: '/hs/payCenter/downLoadAssetDetail',
            method: 'post',
            responseType: 'blob',
            data: params
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, `资金明细列表${Date.now()}.xlsx`);
        }).catch(() => {
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }
    
    handlePageChange = (pagination) => {
        const { current, pageSize } = pagination;
        const { getTableData } = this.props;
        getTableData({ ...this.searchParams, pageSize, pageNum: current});
    }

    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({ pageSize: 10, pageNum: 1 });

        try {
            const _this = this;
            axios({
                url: '/hs/payCenter/jsonGateWay?tar=/api/v1/AssetDetail/totalAssetBalanceAmount',
                method: 'post',
                data: {}
            }).then((res) => {
                if(res && res.code == '200') {
                    var totalAssetBalanceStr = !isNaN(res.data.totalAssetBalance) ? (res.data.totalAssetBalance/100).toFixed(2) : '';
                    var incomeTotalBalanceStr = !isNaN(res.data.incomeTotalBalance) ? (res.data.incomeTotalBalance/100).toFixed(2) : '';
                    var expenseTotalBalanceStr = !isNaN(res.data.expenseTotalBalance) ? (res.data.expenseTotalBalance/100).toFixed(2) : '';
                    _this.setState({
                        totalAssetBalance: convertMoneyFormat(totalAssetBalanceStr),
                        incomeTotalBalance: convertMoneyFormat(incomeTotalBalanceStr),
                        expenseTotalBalance: convertMoneyFormat(expenseTotalBalanceStr)
                    });
                }
            });        
        } catch (e) {

        }
    }

    render() {
        const { tableData: { data, pagination }, loading} = this.props;
        const {btnDisabled} = this.state;
        return (
            <div>
                <div>
                   <SearchList handleSearch={this.handleSearch}/>
                   <Button type={'danger'} disabled={btnDisabled} onClick={this.exportAssetDetailOrder}>导出</Button>
                </div>
                <br/>
                <span>
                    资产盈余:  <span className={styles.totalAmount}>{this.state.totalAssetBalance}</span>
                    资产总收入:  <span className={styles.totalAmount}>{this.state.incomeTotalBalance}</span>
                    资产总支出:  <span className={styles.totalAmount}>{this.state.expenseTotalBalance}</span>
                </span>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { payAndSettleManageState: { assetDetailListState } } = state;
    
    return {
        tableData: assetDetailListState['data'],
        loading: assetDetailListState['loading']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData:       assetDetailListAction.assetDetailGetTableData,
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailList);