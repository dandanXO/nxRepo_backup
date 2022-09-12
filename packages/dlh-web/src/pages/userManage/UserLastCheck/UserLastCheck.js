import React, {Component} from 'react';
import {Button, Alert, Icon, Popconfirm} from 'antd';
import {connect} from 'react-redux';
import { CommonTable, CopyText } from 'components';
import styles from './UserLastCheck.less';
import {covertUrlParams, orderStatus, convertMoneyFormat} from 'utils';
import { CheckOption } from '../UserRepeatCheck/index';
import { userLastCheckAction } from './index';
import { bindActionCreators } from "redux";
import moment from 'moment';
import {injectIntl, FormattedMessage} from "react-intl";
import PropTypes from 'prop-types';

class UserLastCheck extends Component {

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
        this.columns = [
            // {title: '产品类型', dataIndex: 'deviceModel', key: 'deviceModel'},
            { title: <FormattedMessage id="page.search.list.name" />, dataIndex: 'nameTrue', key: 'nameTrue', width: '18%', render(text) { return <CopyText text={text} /> } },
            { title: <FormattedMessage id="page.search.list.mobile" />, dataIndex: 'phoneNo', key: 'phoneNo', width: '9%', render(text) { return <CopyText text={text} /> } },
            {
                title: <FormattedMessage id="page.table.old.user" />,
                dataIndex: 'isOlduser',
                key: 'isOlduser',
                width: '9%',
                render(text) {
                    return Number(text) === 0 ? <FormattedMessage id="page.table.no" /> : <FormattedMessage id="page.table.yes" />;
                }
            },
            {
                title: <FormattedMessage id="page.table.authinfo.state" />,
                dataIndex: 'userAuthInfo.province',
                key: 'province',
                render(text) { return <CopyText text={text} /> }

            },
            {
                title: <FormattedMessage id="page.table.authinfo.district" />,
                dataIndex: "userAuthInfo.city",
                key: "city",
                render(text) { return <CopyText text={text} /> }
            },
            // {title: <FormattedMessage id="page.table.loan.period" />, dataIndex: "lendDays", key: "lendDays"},
            // {
            //     title: <FormattedMessage id="page.table.handling.fee" />,
            //     dataIndex: "serviceMoney",
            //     key: "serviceMoney",
            //     render(text, record) {
            //         const {deviceMoney, lendMoney} = record;
            //         const res = Number(deviceMoney - lendMoney);
            //         return convertMoneyFormat(res);
            //     }
            // },
            {
                title: <FormattedMessage id="page.search.list.reg.time" />,
                dataIndex: 'addTime',
                key: 'addTime',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            { title: <FormattedMessage id="page.table.channel.source" />, dataIndex: 'channelName', key: 'channelName', width: '15%', render(text) { return <CopyText text={text} /> } },
            // {title: '审核员', dataIndex: 'examiner2Id', key: 'examiner2Id'},
            {
                title: <FormattedMessage id="page.search.list.status" />,
                dataIndex: 'status',
                key: 'status',
                width: '6%',
                render(text) {
                    return orderStatus[text];
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.table.operation" }),
                dataIndex: 'id',
                key: 'id',
                width: '5%',
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
        const { setUserId, getDetailData } = this.props;
        const {id, userId} = record;
        //保存id
        setUserId(id);
        getDetailData({userId: id});
    }


    handleReload = (record) => {
      
        const { getDebtsData } = this.props;
        
        console.log(record);
        getDebtsData(record);
    }

    getUser = () => {
        const { distributeRepeatUser } = this.props;
        distributeRepeatUser({});
    }

    handlePageChange = (info) => {
        const { current, pageSize } = info;
        const {getTableData} = this.props;
        getTableData({ pageNum: current, pageSize })

    }
    //审核
    handleCheck = (obj) => {
        const { checkOption, reason } = obj;
        const { postCheck, userId } = this.props;
        postCheck({ userId, status: checkOption, reason });

    }

    //batch审核
    handleBatchApproveCheck = () => {
        const { batchPostCheck } = this.props;
        let postParams = {
            userNrs: [],
            status:1,
            reason:"",
            remark:"batch approve final checking"
        };
       this.state.batchData.forEach(function(item){
         postParams.userNrs.push(item.userNo)
        });

        console.log(postParams);
        batchPostCheck(postParams);

    }
    //batch审核
    handleBatchRejectCheck = () => {
        const { batchPostCheck } = this.props;
        let postParams = {
            userNrs: [],
            status:0,
            reason:"",
            remark:"batch reject final checking"
        };
       this.state.batchData.forEach(function(item){
         postParams.userNrs.push(item.userNo)
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
        const { tableData: { data, pagination }, loading, btnLoading, allData, surplusUser, btnDisable, intl } = this.props;
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
                                        <Button onClick={this.getUser} type={'primary'}><FormattedMessage id="page.table.get.user" /></Button>
                                    </span>
                                    <span style={{"display":"none"}}>
                                        <Popconfirm title={intl.formatMessage({id : "page.table.oneClick.pass.confirm"})} onConfirm={this.handleBatchApproveCheck.bind(this)}>
                                            <Button  type={'primary'} loading={btnLoading}><FormattedMessage id="page.table.oneClick.pass" /></Button>
                                        </Popconfirm>
                                    </span>
                                 
                                    <span style={{"display":"none"}}>
                                        <Popconfirm title={intl.formatMessage({id : "page.table.oneClick.reject.confirm"})} onConfirm={this.handleBatchRejectCheck.bind(this)}>
                                            <Button  type={'primary'} loading={btnLoading}><FormattedMessage id="page.table.oneClick.reject"/></Button>
                                        </Popconfirm>
                                    </span>
                                </div>
                                <Alert message={intl.formatMessage({id :"page.table.num.approval.user"},{count : surplusUser})} type="info"/>
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
    const {userManageState: { userLastCheckState }} = state;
    return {
        tableData: userLastCheckState['data'],
        loading: userLastCheckState['loading'],
        btnLoading: userLastCheckState['submitLoading'],
        btnDisable: userLastCheckState['btnLoading'],
        allData: userLastCheckState['allData'],
        userId: userLastCheckState['userId'],
        surplusUser: userLastCheckState['surplusUser']
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: userLastCheckAction.ulcGetTableData,
        setTableData: userLastCheckAction.ulcSetTableData,
        getDetailData: userLastCheckAction.ulcGetDetailData,
        postCheck: userLastCheckAction.ulcPostCheckInfo,
        batchPostCheck: userLastCheckAction.ulcBatchPostCheckInfo,
        setUserId: userLastCheckAction.ulcSetUserId,
        distributeRepeatUser: userLastCheckAction.ulcDistributeUser,
        getDebtsData: userLastCheckAction.ulcGetDebtsData,
    }, dispatch)
}

UserLastCheck.Proptypes={
    intl: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserLastCheck));

