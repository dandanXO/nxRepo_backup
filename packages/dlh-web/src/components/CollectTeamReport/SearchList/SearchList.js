import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker, Row, Col, Button, Select } from 'antd';
import {injectIntl, FormattedMessage} from "react-intl";
import {axios} from "utils";

const Option = Select.Option;
const { RangePicker } = DatePicker;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};

class SearchList extends Component{
    constructor(props) {
        super(props);
        this.state = {
          btnDisabled: true
        };
    }

    submit = (e) => {
        e.preventDefault();
        const { form: { getFieldsValue }, handleSearch } = this.props;
        handleSearch(getFieldsValue());
    }

    renderTeam = () => {
        const { teamsData } = this.props;
        return teamsData.map(item => <Option key={item.id} value={item.id} >{item.name}</Option>)
    }

    downloadCollectReport = () => {
        const { form: { getFieldsValue }, downloadReport } = this.props;

        const { time, collectTeamId, leng, merchantId = '' } = getFieldsValue()
        const isArr = Array.isArray(time) && time.length > 0;
        const params = {
            startDate: isArr ? time[0].format('YYYY-MM-DD') : '',
            endDate: isArr ? time[1].format('YYYY-MM-DD') : '',
            collectTeamId,
            leng,
            merchantId
        }

        downloadReport(params);

    }

    renderMerchants = () => {
      const { allMerchants } = this.props;
      if(!allMerchants) return;
      const ele = allMerchants.map(item => <Option key={item.merchantId} value={item.merchantId} >{item.name}</Option>);
      return [<Option value={''} key={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>].concat(ele);
    }

  componentDidMount () {
    const _this = this;

    loadDownloadLinkFlag();
    function loadDownloadLinkFlag() {
      axios({
        url: '/hs/admin/collect-team-report/overdue/v2/download-is-prohibited',
        method: 'get',
      }).then((res) => {
        _this.setState({
          btnDisabled: res,
        });
      });
    }
  }

    render() {
        const { form: { getFieldDecorator }, initTime, intl, isSuperAdmin } = this.props;
        const { btnDisabled } = this.state;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row gutter={60}>
                        {isSuperAdmin && (
                          <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.merchantName"})}>
                              {
                                getFieldDecorator('merchantId', {
                                  initialValue: ''
                                })(
                                  <Select>
                                    {this.renderMerchants()}
                                  </Select>
                                )
                              }
                            </Form.Item>
                          </Col>
                        )}
                        <Col span={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.report.date"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: initTime
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.select"}), intl.formatMessage({id : "page.search.list.select"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.collect-team"})}>
                                {
                                    getFieldDecorator('collectTeamId', {
                                        initialValue: ""
                                    })(
                                        <Select >
                                           <Option key={'teamOption'} value=""><FormattedMessage id="page.search.list.no.restrict" /></Option>
                                           {this.renderTeam()}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.leng"})}>
                                {
                                    getFieldDecorator('leng', {
                                        initialValue: ""
                                    })(
                                        <Select >
                                            <Option key={'lengOption'} value=""><FormattedMessage id="page.search.list.no.restrict" /></Option>
                                            <Option key={'lengTrue'} value="true"><FormattedMessage id="page.table.yes" /></Option>
                                            <Option key={'lengFalse'} value="false"><FormattedMessage id="page.table.no" /></Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item style={{textAlign:'right'}}>
                                <Button type={'primary'} htmlType={'submit'}><FormattedMessage id="page.search.list.search" /></Button>
                           </Form.Item>
                        </Col>
                    </Row>
                    <Col span={24}>
                            <Form.Item style={{textAlign:'left'}}>
                                <Button type={'danger'} disabled={btnDisabled} onClick={this.downloadCollectReport}><FormattedMessage id="page.table.export" /></Button>
                           </Form.Item>
                        </Col>
                </Form>
            </div>

        );
    }
}
SearchList.propTypes = {
    handleSearch: PropTypes.func,
    intl: PropTypes.object.isRequired,
    teamsData: PropTypes.array,
    initTime: PropTypes.array

};
SearchList.defaultProps = {
    handleSearch: () => { },
    teamsData: [],
    initTime: []
};

export default Form.create()(injectIntl(SearchList));
