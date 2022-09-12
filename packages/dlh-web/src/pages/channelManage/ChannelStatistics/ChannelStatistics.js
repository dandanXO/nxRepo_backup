import React, { Component } from "react";
import { connect } from "react-redux";
import { CommonTable } from "components";
import SearchList from "./SearchList/SearchList";
import { channelStatisticsAction } from "./index";
import { bindActionCreators } from "redux";
import moment from "moment/moment";
import { message, Button } from "antd";
import { axios } from "utils";
import download from "downloadjs";
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

class ChannelStatistics extends Component {
  columns = [
    {
      title: <FormattedMessage id="page.search.list.time" />,
      dataIndex: "day",
      key: "day"
    },
    {
      title: <FormattedMessage id="page.search.list.channelId" /> ,
      dataIndex: "name",
      key: "name"
    },
    {
      title: <FormattedMessage id="page.table.num.registration" />,
      dataIndex: "regNum",
      key: "regNum",
      render(text) {
        return text || 0;
      }
    },
    {
      title: <FormattedMessage id="page.table.uv.qantity" />,
      dataIndex: 'uv',
      key: 'uv',
      sorter: true },
    {
      title: <FormattedMessage id="page.table.pv.qantity" />,
      dataIndex: 'pv',
      key: 'pv',
      sorter: true },
    {
      title: <FormattedMessage id="page.table.num.app" />,
      dataIndex: "subNum",
      key: "subNum",
      render(text) {
        return text || 0;
      }
    },
    {
      title: <FormattedMessage id="page.table.loan.qantity" />,
      dataIndex: "loanNum",
      key: "loanNum",
      render(text) {
        return text || 0;
      }
    }
  ];
  constructor(props) {
    super(props);
    this.state = {
      btnDisabled: false
    };
    this.searchParams = {
     // time: [moment(0, "HH"), moment({ hour: 23, minute: 59, seconds: 59 })]
      time: [
        moment().subtract(9, 'days'),
        moment()
      ]
    };
  }

  convertParams = () => {
    const { time, channelId = "" } = this.searchParams;
    const isArr = Array.isArray(time) && time.length > 0;
    const startTime = isArr ? time[0].format("YYYY-MM-DD 00:00:00") : "";
    const endTime = isArr ? time[1].format("YYYY-MM-DD 23:59:59") : "";
    return { channelId, startTime, endTime };
  };
  handleSearch = obj => {
    const { getTableData } = this.props;
    this.searchParams = obj;
    const params = this.convertParams();
    getTableData({ ...params });
  };
  componentDidMount() {
    const { getTableData, getSourceData } = this.props;
    const params = this.convertParams();
    getTableData({ ...params });
    getSourceData({ pageSize: 10000, pageNum: 1 });
  }

  //导出记录
  exportRecord = () => {
    this.setState({ btnDisabled: true });
    let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
    const searchStatus = this.convertParams();
    axios({
      url: "/hs/admin/channel/downLoadStatistics",
      method: "post",
      responseType: "blob",
      data: searchStatus
    })
      .then(res => {
        hide && hide();
        this.setState({ btnDisabled: false });
        download(res, this.props.intl.formatMessage({id : "page.table.channel.statis.export.one"}));
      })
      .catch(() => {
        hide && hide();
        this.setState({ btnDisabled: false });
      });
  };

  render() {
    const { tableData: { data },loading,sourceData} = this.props;
    const { btnDisabled } = this.state;
    return (
      <div>
        <SearchList
          handleSearch={this.handleSearch}
          exportRecord={this.exportRecord}
          initTime={this.searchParams.time}
          sourceData={sourceData}
          btnDisable={btnDisabled}
        />
        {/* <div><Button type={'primary'} disabled={btnDisabled} onClick={this.exportRecord}>导出</Button></div>               */}
        <CommonTable
          columns={this.columns}
          dataSource={data}
          loading={loading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    channelManageState: { channelStatisticsState }
  } = state;
  return {
    tableData: channelStatisticsState["tableData"],
    loading: channelStatisticsState["loading"],
    sourceData: channelStatisticsState["sourceData"]
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getTableData: channelStatisticsAction.clsGetTableData,
      getSourceData: channelStatisticsAction.clsGetSourceData
    },
    dispatch
  );
};

ChannelStatistics.PropTypes = {
  intl: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ChannelStatistics));
