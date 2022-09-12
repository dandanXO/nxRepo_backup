import React, {Component} from 'react';
import {Button, Alert, Icon, Popconfirm} from 'antd';
import {connect} from 'react-redux';
import {CommonTable} from 'components';
import styles from './BusinessRepeatCheck.less';
import {covertUrlParams, orderStatus} from 'utils';
import CheckOption from './CheckOption/CheckOption';
import {businessRepeatCheckAction} from './index';
import {bindActionCreators} from "redux";
import {repeatCheckClomns} from './constant';
import {injectIntl, FormattedMessage} from "react-intl";
import PropTypes from 'prop-types';

class BusinessRepeatCheck extends Component {
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
        this.columns = repeatCheckClomns.concat(
            {
                title: props.intl.formatMessage({ id: "page.table.operation" }),
                dataIndex: 'id',
                key: 'id',
                width: 80,
                render(text, record) {
                    return (
                        <div onClick={() => _this.handleClick(record)} className={styles.check}><Icon type={'edit'}/>
                        </div>
                    );
                }

            }
        )
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
        const { id, userId } = record;
        //保存id
        setOrderId(id);
        // console.log(record);
        getDetailData({orderId: id, userId});
    }

    
    handleReload = (record) => {
      
        const { getDebtsData } = this.props;
        
        // console.log(record);
        getDebtsData(record);
    }

    //获取订单
    getOrder = () => {
        const { distributeOrder } =  this.props;
        distributeOrder({});
    }

    //表格分页
    handlePageChange = (info) => {
        const {current, pageSize} = info;
        const {getTableData} = this.props;
        getTableData({pageNum: current, pageSize})
    }
    //审核
    handleCheck = (obj) => {
        let { checkOption, reason, remark} = obj;
        reason = remark === undefined ? reason : remark;
        const  {postCheck, orderId } = this.props;
        postCheck({orderId, status: checkOption, reason});
    }

    componentDidMount() {
        const {getTableData} = this.props;
        console.log(getTableData)
        getTableData({pageNum: 1, pageSize: this.pageSize});
    }

    componentWillReceiveProps(nextProps) {
        const next = this.getParamsOption(nextProps);
        const current = this.getParamsOption(this.props);
        if(next !== current) {
            this.setState({ isShowDetail: next });
        }
    }
    componentWillUnmount() {
        const { setTableData } = this.props;
        setTableData({
            data: [],
            pagination: {}
        })
    }
    componentDidUpdate(prevProps, prevState) {
        const { isShowDetail } = prevState;
        if(isShowDetail && isShowDetail !==  this.state.isShowDetail) {
            const {getTableData} = this.props;
            getTableData({pageNum: 1, pageSize: this.pageSize});
        }
    }


    batchHandleRepeatChecking(){
       let postParams = {
           orderNrs: [],
           status:1,
           reason:"",
           remark:"batch approve repeat checking"
       };
      this.state.batchData.forEach(function(item){
        postParams.orderNrs.push(item.orderNo)
       });
       const  {batchPostCheck} = this.props;
       //console.log(postParams);
       batchPostCheck(postParams);
    }

    batchRejectRepeatChecking(){
        let postParams = {
            orderNrs: [],
            status:0,
            reason:"",
            remark:"batch reject repeat checking"
        };
       this.state.batchData.forEach(function(item){
         postParams.orderNrs.push(item.orderNo)
        });
        const  {batchPostCheck} = this.props;
        //console.log(postParams);
        batchPostCheck(postParams);
     }

    render() {
        const {tableData: {data, pagination}, loading, btnLoading, allData, surplusOrder, intl} = this.props;
        const { isShowDetail } = this.state;
        // console.log(data)
        this.state.batchData = data;
        return (
            <div>
                {
                    isShowDetail ? <div>
                            <CheckOption
                                loading={btnLoading}
                                allData={allData}
                                isLastCheck={false}
                                handleSubmit={this.handleCheck}
                                handleReload={this.handleReload}
                            />
                        </div> :
                        <div>
                            <div>
                                <div className={styles.btn}>
                                    <span><Button onClick={this.getOrder} type={'primary'}><FormattedMessage id="page.table.get.order" /></Button></span>
                                    <span>
                                        <Popconfirm title={intl.formatMessage({id : "page.table.oneClick.pass.confirm"})} onConfirm={this.batchHandleRepeatChecking.bind(this)}>
                                            <Button  type={'primary'} loading={btnLoading}><FormattedMessage id="page.table.oneClick.pass" /></Button>
                                        </Popconfirm>
                                    </span>
                                 
                                    <span>
                                        <Popconfirm title={intl.formatMessage({id : "page.table.oneClick.reject.confirm"})} onConfirm={this.batchRejectRepeatChecking.bind(this)}>
                                            <Button  type={'primary'} loading={btnLoading}><FormattedMessage id="page.table.oneClick.reject" /></Button>
                                        </Popconfirm>
                                    </span>
                                </div>
                                
                                <Alert message={intl.formatMessage({id : "page.table.num.approval.order"}, {count : surplusOrder})} type="info"/>
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
    const {windControlCheckState: {businessRepeatCheckState}} = state;
    return {
        tableData: businessRepeatCheckState['data'],
        loading: businessRepeatCheckState['loading'],
        btnLoading: businessRepeatCheckState['submitLoading'],
        allData: businessRepeatCheckState['allData'],
        orderId: businessRepeatCheckState['orderId'],
        surplusOrder: businessRepeatCheckState['surplusOrder']
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: businessRepeatCheckAction.wccGetTableData,
        setTableData: businessRepeatCheckAction.wccSetTableData,
        getDetailData: businessRepeatCheckAction.wccGetDetailData,
        postCheck: businessRepeatCheckAction.wccPostCheckInfo,
        batchPostCheck: businessRepeatCheckAction.wccBatchPostCheckInfo,
        setOrderId: businessRepeatCheckAction.wccSetOrderId,
        distributeOrder: businessRepeatCheckAction.wccDistributeOrder,
        repeatDistributeOrder: businessRepeatCheckAction.wccRepeatDistribute,
        getDebtsData: businessRepeatCheckAction.wccGetDebtsData,
    }, dispatch);
}

BusinessRepeatCheck.PropTypes ={
    intl: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BusinessRepeatCheck));