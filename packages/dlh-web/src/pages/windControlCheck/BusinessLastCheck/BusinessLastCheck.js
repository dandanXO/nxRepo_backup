import React, { Component } from 'react';
import { Button, Alert, Icon, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { CommonTable, CopyText } from 'components';
import styles from './BusinessLastCheck.less';
import { covertUrlParams, orderStatus, convertMoneyFormat } from 'utils';
import { CheckOption } from '../BusinessRepeatCheck/index';
import { businessLastCheckAction } from './index';
import { bindActionCreators } from "redux";
import moment from 'moment';
import { injectIntl, FormattedMessage } from "react-intl";
import PropTypes from 'prop-types';

class BusinessLastCheck extends Component {

    params = ['baseInfo', 'operatorInfo', 'unionDebtsInfo', 'checkResult']

    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: this.getParamsOption(this.props),
            batchData:[]

        };
        const _this = this;
        this.pageSize = 10;
        this.orderId = '';
        this.columns = [
            { title: props.intl.formatMessage({ id: "page.search.list.order.no" }), dataIndex: 'orderNo', key: 'orderNo', width: 200, render(text) { return <CopyText text={text} /> } },
            // {title: '产品类型', dataIndex: 'deviceModel', key: 'deviceModel'},
            { title: props.intl.formatMessage({ id: "page.search.list.name" }), dataIndex: 'userTrueName', key: 'userTrueName', width: 180, render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({ id: "page.search.list.mobile" }), dataIndex: 'userPhone', key: 'userPhone', width: 130, render(text) { return <CopyText text={text} /> } },
            {
                title: props.intl.formatMessage({ id: "page.table.old.user" }),
                dataIndex: 'isOlduser',
                key: 'isOlduser',
                width: 130,
                render(text) {
                    return Number(text) === 0 ? props.intl.formatMessage({ id: "page.table.no" }) : props.intl.formatMessage({ id: "page.table.yes" });
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.application.amount" }),
                dataIndex: 'deviceMoney',
                key: 'deviceMoney',
                width: 120,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)} />;
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.loan.amount" }),
                dataIndex: "lendMoney",
                key: "lendMoney",
                width: 110,
                render(text, record) {
                    return <CopyText text={convertMoneyFormat(text)} />;
                }
            },
            { title: props.intl.formatMessage({ id: "page.table.loan.period" }), dataIndex: "lendDays", key: "lendDays", width: 110 },
            {
                title: props.intl.formatMessage({ id: "page.table.handling.fee" }),
                dataIndex: "serviceMoney",
                key: "serviceMoney",
                width: 110,
                render(text, record) {
                    const { deviceMoney, lendMoney } = record;
                    const res = Number(deviceMoney - lendMoney);
                    return <CopyText text={convertMoneyFormat(res)} />;
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.search.list.appication.time" }),
                dataIndex: 'applyTime',
                key: 'applyTime',
                width: 170,
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            { title: props.intl.formatMessage({ id: "page.table.channel.source" }), dataIndex: 'channelName', key: 'channelName', width: 180 , render(text) { return <CopyText text={text} /> } },
            // {title: '审核员', dataIndex: 'examiner2Id', key: 'examiner2Id'},
            {
                title: props.intl.formatMessage({ id: "page.search.list.status" }),
                dataIndex: 'status',
                key: 'status',
                width: 100,
                render(text) {
                    return orderStatus[text];
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.operation" }),
                dataIndex: 'id',
                key: 'id',
                width: 80,
                render(text, record) {
                    return (
                        <div onClick={() => _this.handleClick(record)} className={styles.check}><Icon type={'edit'} />
                        </div>
                    );
                }

            }

        ]
    }

    getParamsOption = (props) => {
        const {location: {search}} = props;
        const obj = covertUrlParams(search);
        const arr = Object.keys(obj);
        return arr.indexOf('option') !== -1 && this.params.indexOf(obj['option']) !== -1;

    }

    //获取订单详情，跳转审核页面
    handleClick = (record) => {
        const { setOrderId, getDetailData } = this.props;
        const {id, userId} = record;
        //保存id
        setOrderId(id);
        getDetailData({orderId: id, userId});
    }


    handleReload = (record) => {
      
        const { getDebtsData } = this.props;
        
        console.log(record);
        getDebtsData(record);
    }

    getOrder = () => {
        const { distributeRepeatOrder } = this.props;
        distributeRepeatOrder({});
    }

    handlePageChange = (info) => {
        const { current, pageSize } = info;
        const {getTableData} = this.props;
        getTableData({ pageNum: current, pageSize })

    }
    //审核
    handleCheck = (obj) => {
        const { checkOption, reason } = obj;
        const { postCheck, orderId } = this.props;
        postCheck({ orderId, status: checkOption, reason });

    }

    //batch审核
    handleBatchApproveCheck = () => {
        const { batchPostCheck } = this.props;
        let postParams = {
            orderNrs: [],
            status:1,
            reason:"",
            remark:"batch approve final checking"
        };
       this.state.batchData.forEach(function(item){
         postParams.orderNrs.push(item.orderNo)
        });

        console.log(postParams);
        batchPostCheck(postParams);

    }
    //batch审核
    handleBatchRejectCheck = () => {
        const { batchPostCheck } = this.props;
        let postParams = {
            orderNrs: [],
            status:0,
            reason:"",
            remark:"batch reject final checking"
        };
       this.state.batchData.forEach(function(item){
         postParams.orderNrs.push(item.orderNo)
        });

        console.log(postParams);
        batchPostCheck(postParams);

    }

    componentDidMount() {
        const {getTableData} = this.props;
        getTableData({ pageNum: 1, pageSize: this.pageSize });
    }
    componentWillUnmount() {
        const { setTableData } =  this.props;
        setTableData({ data: [], pagination: {} });
    }
    componentWillReceiveProps(nextProps) {
        const next = this.getParamsOption(nextProps);
        const current = this.getParamsOption(this.props);
        if(next !== current) {
            this.setState({ isShowDetail: next });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { isShowDetail } = prevState;
        if(isShowDetail && isShowDetail !==  this.state.isShowDetail) {
            const {getTableData} = this.props;
            getTableData({pageNum: 1, pageSize: this.pageSize});
        }
    }
    render() {
        const { tableData: { data, pagination }, loading, btnLoading, allData, surplusOrder, btnDisable, intl } = this.props;
        const { isShowDetail } = this.state;
        this.state.batchData = data;
        return (
            <div>
                {
                    isShowDetail ? <div>

                            <CheckOption
                                loading={btnLoading}
                                allData={allData}
                                isLastCheck={true}
                                handleSubmit={this.handleCheck}
                                handleReload={this.handleReload}
                            />
                        </div> :
                        <div>
                            <div>
                                <div className={styles.btn}>
                                    <span>
                                        <Button onClick={this.getOrder} type={'primary'}><FormattedMessage id="page.table.get.order" /></Button>
                                    </span>
                                    <span>
                                        <Popconfirm title={intl.formatMessage({id : "page.table.oneClick.pass.confirm"})} onConfirm={this.handleBatchApproveCheck.bind(this)}>
                                            <Button  type={'primary'} loading={btnLoading}><FormattedMessage id="page.table.oneClick.pass" /></Button>
                                        </Popconfirm>
                                    </span>
                                 
                                    <span>
                                        <Popconfirm title={intl.formatMessage({id : "page.table.oneClick.reject.confirm"})} onConfirm={this.handleBatchRejectCheck.bind(this)}>
                                            <Button  type={'primary'} loading={btnLoading}><FormattedMessage id="page.table.oneClick.reject"/></Button>
                                        </Popconfirm>
                                    </span>
                                </div>
                                <Alert message={intl.formatMessage({id :"page.table.num.approval.order"},{count : surplusOrder})} type="info"/>
                            </div>

                            <CommonTable
                                handlePageChange={this.handlePageChange}
                                columns={this.columns}
                                pagination={pagination}
                                loading={loading}
                                dataSource={data}
                                scroll={{x:'100%'}}
                            />
                        </div>
                }

            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const {windControlCheckState: { businessLastCheckState }} = state;
    return {
        tableData: businessLastCheckState['data'],
        loading: businessLastCheckState['loading'],
        btnLoading: businessLastCheckState['submitLoading'],
        btnDisable: businessLastCheckState['btnLoading'],
        allData: businessLastCheckState['allData'],
        orderId: businessLastCheckState['orderId'],
        surplusOrder: businessLastCheckState['surplusOrder']
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: businessLastCheckAction.blcGetTableData,
        setTableData: businessLastCheckAction.blcSetTableData,
        getDetailData: businessLastCheckAction.blcGetDetailData,
        postCheck: businessLastCheckAction.blcPostCheckInfo,
        batchPostCheck: businessLastCheckAction.blcBatchPostCheckInfo,
        setOrderId: businessLastCheckAction.blcSetOrderId,
        distributeRepeatOrder: businessLastCheckAction.blcDistributeOrder,
        getDebtsData: businessLastCheckAction.blcGetDebtsData,
    }, dispatch)
}

BusinessLastCheck.Proptypes={
    intl: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BusinessLastCheck));

