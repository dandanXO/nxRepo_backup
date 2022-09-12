import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CommonTable} from 'components';
import {overOrderHandleRecordAction} from './index';
import SearchList from './SearchList/SearchList';
import moment from 'moment';
import {Button, message} from 'antd';
import {axios, convertMoneyFormat} from "utils";
import download from "downloadjs";
import styles from './OverOrderHandleRecord.less';
import {FormattedMessage, injectIntl} from "react-intl";
import PropTypes from 'prop-types';

const convertParams = (obj = {}) => {
    const {time = [], orderNo = '', userName = '', phoneNo = '', status = ''} = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        orderNo,
        phoneNo,
        userName,
        status
    };
}

class OverOrderHandleRecord extends Component {
    columns = [
        {title: this.props.intl.formatMessage({id: "page.search.list.order.no"}), dataIndex: 'orderNo', key: 'orderNo'},
        {title: this.props.intl.formatMessage({id: "page.search.list.name"}), dataIndex: 'userTrueName', key: 'userTrueName'},
        {title: this.props.intl.formatMessage({id: "page.search.list.mobile"}), dataIndex: 'userPhone', key: 'userPhone'},
        {
            title: this.props.intl.formatMessage({id: "page.table.loan"}),
            dataIndex: 'deviceMoney',
            key: 'deviceMoney',
            render(text, record) {
                return convertMoneyFormat(text);
            }
        },
        {title: this.props.intl.formatMessage({id: "page.table.loan.period"}), dataIndex: 'lendDays', key: 'lendDays'},
        {
            title: this.props.intl.formatMessage({id: "page.search.list.expiration.time"}),
            dataIndex: 'expireTime',
            key: 'expireTime',
            render(text) {
                return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        {
            title: this.props.intl.formatMessage({id: "windowPage.repayment.amount"}),
            dataIndex: 'payMoney',
            key: 'payMoney',
            render(text, record) {
                const {isCx} = record;
                let ele = [];
                if (isCx == 1 && Number(text) !== 0) {
                    ele.push(<div className={styles.title_red}>{convertMoneyFormat(text)}</div>);
                    return ele;
                }
                return convertMoneyFormat(text);
            }
        },
        {
            title: this.props.intl.formatMessage({id: "windowPage.reduce.amount"}),
            dataIndex: 'reductionMoney',
            key: 'reductionMoney',
            render(text, record) {
                const {isCx} = record;
                let ele = [];
                if (isCx == 1 && Number(text) !== 0) {
                    ele.push(<div className={styles.title_red}>{convertMoneyFormat(text)}</div>);
                    return ele;
                }
                return convertMoneyFormat(text);
            }
        },
        {
            title: this.props.intl.formatMessage({id: "page.table.operation.time"}),
            dataIndex: 'addTime',
            key: 'addTime',
            render(text) {
                return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        {title: this.props.intl.formatMessage({id: "windowPage.remarks"}), dataIndex: 'remark', key: 'remark'}
    ];

    constructor(props) {
        super(props);
        this.state = {
            btnDisabled: false
        };
        this.pageSize = 10;
        this.searchParams = convertParams();

    }

    handlePageChange = (info) => {
        const {current, pageSize} = info;
        const {getTableData} = this.props;
        getTableData({pageSize, pageNum: current, ...this.searchParams});
    }

    handleSearch = (obj) => {
        const params = convertParams(obj);
        this.searchParams = params;
        const {getTableData} = this.props;
        getTableData({...params, pageSize: this.pageSize, pageNum: 1});
    }

    componentDidMount() {
        const {getTableData} = this.props;
        getTableData({pageSize: this.pageSize, pageNum: 1, ...this.searchParams});
    }

    componentWillUnmount() {
        const {setTableData} = this.props;
        setTableData({data: [], pagination: {}});
    }


    //导出还款记录列表
    exportRecord = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id: "page.table.exporting"}), 0);
        const _this = this;
        axios({
            url: '/hs/admin/orderEdit/downloadResetRecordList',
            method: 'post',
            responseType: 'blob',
            data: _this.searchParams
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, this.props.intl.formatMessage({id: "page.table.late.fee.export"}, {expDate: Date.now()}));
        }).catch(() => {
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }


    render() {
        const {tableData: {data, pagination}, loading} = this.props;
        const {btnDisabled} = this.state;
        return (
            <div>
                <SearchList submit={this.handleSearch}/>
                <div><Button type={'danger'} disabled={btnDisabled} onClick={this.exportRecord}><FormattedMessage id="page.table.export.record"/></Button></div>
                <CommonTable
                    columns={this.columns}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    handlePageChange={this.handlePageChange}
                />
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    const {paymentManageState: {overOrderHandleRecordState}} = state;
    return {
        tableData: overOrderHandleRecordState['tableData'],
        loading: overOrderHandleRecordState['loading']
    };

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: overOrderHandleRecordAction.orEdRrdGetTableData,
        setTableData: overOrderHandleRecordAction.orEdRrdSetTableData
    }, dispatch);
}

OverOrderHandleRecord.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OverOrderHandleRecord));