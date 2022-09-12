import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CommonTable } from 'components';
import SearchList from './SearchList/SearchList';
import {channelStatistics2Action, channelStatistics2Saga} from './index';
import {bindActionCreators} from "redux";
import moment from "moment/moment";
import {message, Button} from "antd";
import {axios, convertMoneyFormat} from "utils";
import download from 'downloadjs';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";
class ChannelStatistics2 extends Component {
    columns = [
        {
            title: <FormattedMessage id="page.table.channel.name" />,
            dataIndex: 'channel',
            key: 'channel',
            sorter: true,
            width:170
        },
        {
            title: <FormattedMessage id="page.table.registration.qantity" />,
            dataIndex: 'regNum',
            key: 'regNum',
            sorter: true,
            width:100
        },
        {
            title: <FormattedMessage id="page.table.uv.qantity" />,
            dataIndex: 'uv',
            key: 'uv',
            sorter: true,
            width:100
        },
        {
            title: <FormattedMessage id="page.table.pv.qantity" />,
            dataIndex: 'pv',
            key: 'pv',
            sorter: true ,
            width:100
        },
        {
            title: <FormattedMessage id="page.table.new.customer.application.qantity" />,
            dataIndex: 'newSubNum',
            key: 'newSubNum',
            sorter: true,
            width:120

        },
        {
            title: <FormattedMessage id="page.table.micro-q.enter.percent" />,
            dataIndex: 'wqRegRate',
            key: 'wqRegRate',
            sorter: true,
            width:130
        }, 
        {
            title: <FormattedMessage id="page.table.hit.blacklist.percent" />,
            dataIndex: 'blackRate',
            key: 'blackRate',
            sorter: true,
            width:140
        }, 
        {
            title: <FormattedMessage id="page.table.app.conversion.rate" />,
            dataIndex: 'atos',
            key: 'atos',
            sorter: true,
            width:120
        }, 
        {
            title: <FormattedMessage id="page.table.new.customer.loan.qantity" />,
            dataIndex: 'newLoanNum',
            key: 'newLoanNum',
            sorter: true,
            width:120
        },
        {
            title: <FormattedMessage id="page.table.registration.loan.rate" />,
            dataIndex: 'regLoanRate',
            key: 'regLoanRate',
            sorter: true,
            width:120
        },
        {
            title: <FormattedMessage id="page.table.channel.first.overdue" />,
            dataIndex: 'overNum',
            key: 'overNum',
            sorter: true,
            width:130
        },
        {
            title: <FormattedMessage id="page.table.channel.first.overdue.rate" />,
            dataIndex: 'overRate',
            key: 'overRate',
            sorter: true,
            width:120
        },
        {
            title: <FormattedMessage id="page.table.num.old.customer" />,
            dataIndex: 'oldSubNum',
            key: 'oldSubNum',
            sorter: true,
            width:120
        },
        {
            title: <FormattedMessage id="page.table.num.old.customer.loan" />,
            dataIndex: 'oldLoanNum',
            key: 'oldLoanNum',
            sorter: true,
            width:120
        },
        {
            title: <FormattedMessage id="page.table.num.old.customer.extension" />,
            dataIndex: 'oldLengNum',
            key: 'oldLengNum',
            sorter: true,
            width:130
        },
        // {
        //     title: '老客展期金额',
        //     dataIndex: 'oldLengAmount',
        //     key: 'oldLengAmount',
        //     sorter: true,
        //     render(text, record) {
        //         return convertMoneyFormat(text);
        //     }
        // },
        {
            title: <FormattedMessage id="page.table.num.new.customer.extension" />,
            dataIndex: 'newLengNum',
            key: 'newLengNum',
            sorter: true,
            width:130
        },
        // {
        //     title: '新客展期金额',
        //     dataIndex: 'newLengAmount',
        //     key: 'newLengAmount',
        //     sorter: true,
        //     render(text, record) {
        //         return convertMoneyFormat(text);
        //     }
        // },
        {
            title: <FormattedMessage id="page.table.loan.sum" />,
            dataIndex: 'loanAmount',
            key: 'loanAmount',
            sorter: true,
            width:100,
            render(text, record) {
                return convertMoneyFormat(text);
            }
        }
    ]
    constructor(props) {
        super(props);
        this.state = {
            btnDisabled: false
        };
        this.searchParams = {
            time: [moment(0, 'HH'), moment({hour: 23, minute: 59, seconds: 59})]
        };
    }

    convertParams = () => {
        const { time, channelId = '' } = this.searchParams;
        const isArr = Array.isArray(time) && time.length > 0;
        const startTime = isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '';
        const endTime = isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '';
        return { channelId, startTime, endTime };
    }
    handleSearch = (obj) => {
        const { getTableData } = this.props;
        this.searchParams = obj;
        const params = this.convertParams();
        getTableData({ ...params, page: 0, size: 10 });
    }

    componentDidMount() {
        const { getTableData, getSourceData } = this.props;
        const params = this.convertParams();
        getTableData({ ...params, page: 0, size: 10 });
        getSourceData({ pageSize: 10000, pageNum: 1 });
    }

    //导出记录
    exportRecord = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
        const searchStatus = this.convertParams();
        axios({
            url: '/hs/admin/channel/downLoadStatistics2',
            method: 'post',
            responseType: 'blob',
            data: searchStatus
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, this.props.intl.formatMessage({id : "page.table.channel.statis.export.two"}, {expDate : Date.now()}));
        }).catch(() => {
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }

    render() {
        const { tableData: { data, pagination }, loading, sourceData } = this.props;
        const { btnDisabled } = this.state;
        return (
            <div>
                <SearchList handleSearch={this.handleSearch} initTime={this.searchParams.time} sourceData={sourceData}
                          exportRecord={this.exportRecord}
                          btnDisable={btnDisabled}
                          />
                <CommonTable
                    loading={loading}
                    handlePageChange={this.handlePageChange}
                    columns={this.columns}
                    dataSource={data}
                    pagination={pagination}
                    scroll={{ x: '100%' }}
                />
            </div>
        );
    }
    handlePageChange = (pagination, filters, sorter) => {
        const { pageSize, current } = pagination;
        const { getTableData } = this.props;
        const sortField = sorter.field;
        const sortOrder = sorter.order;
        const params = this.convertParams();
        getTableData({ ...params, sortField, sortOrder, page: current - 1, size: pageSize });
    }
}

const mapStateToProps = (state) => {
    const { channelManageState: { channelStatistics2State } } = state;
    return {
        tableData: channelStatistics2State['tableData'],
        loading: channelStatistics2State['loading'],
        sourceData: channelStatistics2State['sourceData']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: channelStatistics2Action.cs2GetTableData,
        getSourceData: channelStatistics2Action.cs2GetSourceData
    },dispatch)
}

ChannelStatistics2.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ChannelStatistics2));