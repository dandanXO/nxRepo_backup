import React, {Component} from 'react';
import {Button, Alert, Icon, Popconfirm} from 'antd';
import {connect} from 'react-redux';
import {CommonTable} from 'components';
import styles from './UserRepeatCheck.less';
import {covertUrlParams, orderStatus} from 'utils';
import CheckOption from './CheckOption/CheckOption';
import {userRepeatCheckAction} from './index';
import {bindActionCreators} from "redux";
import {repeatCheckClomns} from './constant';
import {injectIntl, FormattedMessage} from "react-intl";
import PropTypes from 'prop-types';

class UserRepeatCheck extends Component {
    params = ['baseInfo', 'operatorInfo', 'unionDebtsInfo', 'checkResult']

    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: this.getParamsOption(this.props),
            batchData:[]
        };
        const _this = this;
        this.pageSize = 10;
        this.userId = '';
        this.columns = repeatCheckClomns.concat(
            {
                title: props.intl.formatMessage({id : "page.table.operation"}),
                dataIndex: 'id',
                key: 'id',
                width:'5%',
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
        const { setUserId, getDetailData } = this.props;
        const { id } = record;
        //保存id
        setUserId(id);
        // console.log(record);
        getDetailData({userId: id});
    }

    
    handleReload = (record) => {
      
        const { getDebtsData } = this.props;
        
        // console.log(record);
        getDebtsData(record);
    }

    //获取订单
    getUser = () => {
        const { distributeUser } =  this.props;
        distributeUser({});
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
        const  {postCheck, userId } = this.props;
        postCheck({userId, status: checkOption, reason});
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
           userNrs: [],
           status:1,
           reason:"",
           remark:"batch approve repeat checking"
       };
      this.state.batchData.forEach(function(item){
        postParams.userNrs.push(item.orderNo)
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
        const {tableData: {data, pagination}, loading, btnLoading, allData, surplusUser, intl} = this.props;
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
                                    <span><Button onClick={this.getUser} type={'primary'}><FormattedMessage id="page.table.get.user" /></Button></span>
                                    <span style={{"display":"none"}}>
                                        <Popconfirm title={intl.formatMessage({id : "page.table.oneClick.pass.confirm"})} onConfirm={this.batchHandleRepeatChecking.bind(this)}>
                                            <Button  type={'primary'} loading={btnLoading}><FormattedMessage id="page.table.oneClick.pass" /></Button>
                                        </Popconfirm>
                                    </span>
                                 
                                    <span style={{"display":"none"}}>
                                        <Popconfirm title={intl.formatMessage({id : "page.table.oneClick.reject.confirm"})} onConfirm={this.batchRejectRepeatChecking.bind(this)}>
                                            <Button  type={'primary'} loading={btnLoading}><FormattedMessage id="page.table.oneClick.reject" /></Button>
                                        </Popconfirm>
                                    </span>
                                </div>
                                
                                <Alert message={intl.formatMessage({id : "page.table.num.approval.user"}, {count : surplusUser})} type="info"/>
                            </div>
                            <CommonTable
                                handlePageChange={this.handlePageChange}
                                columns={this.columns}
                                pagination={pagination}
                                loading={loading}
                                dataSource={data}
                            />
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {userManageState: {userRepeatCheckState}} = state;
    return {
        tableData: userRepeatCheckState['data'],
        loading: userRepeatCheckState['loading'],
        btnLoading: userRepeatCheckState['submitLoading'],
        allData: userRepeatCheckState['allData'],
        userId: userRepeatCheckState['userId'],
        surplusUser: userRepeatCheckState['surplusUser']
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: userRepeatCheckAction.urcGetTableData,
        setTableData: userRepeatCheckAction.urcSetTableData,
        getDetailData: userRepeatCheckAction.urcGetDetailData,
        postCheck: userRepeatCheckAction.urcPostCheckInfo,
        batchPostCheck: userRepeatCheckAction.urcBatchPostCheckInfo,
        setUserId: userRepeatCheckAction.urcSetUserId,
        distributeUser: userRepeatCheckAction.urcDistributeUser,
        repeatDistributeUser: userRepeatCheckAction.urcRepeatDistribute,
        getDebtsData: userRepeatCheckAction.urcGetDebtsData,
    }, dispatch);
}


const propTypes = {
    intl: PropTypes.object.isRequired,
};

UserRepeatCheck.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserRepeatCheck));