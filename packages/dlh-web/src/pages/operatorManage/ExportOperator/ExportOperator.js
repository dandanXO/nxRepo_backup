import React, { Component } from 'react';
import { Button, Form, DatePicker } from 'antd';
import { axios } from 'utils';
import download from "downloadjs";
import {message} from "antd/lib/index";
import moment from 'moment';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

const {RangePicker} = DatePicker;
const FormItem = Form.Item;

class ExportOperator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnDisabled: false
        };
        this.initTime = [
            moment().add(1, 'days'),
            moment().add(1,'days')
        ];
    }

    submit = (e) => {
        e.preventDefault();
        const _this = this;
        const { form: { validateFields, getFieldsValue } } = this.props;
        validateFields((err, values) => {
            if(err) {
                return;
            }
            const { time } = getFieldsValue();
            const isArr = Array.isArray(time) && time.length > 0;
            const params = {
                startTime: isArr ? time[0].format('YYYY-MM-DD') : '',
                endTime: isArr ? time[1].format('YYYY-MM-DD') : ''
            };
            _this.exportOrder(params);
        })
    }
    exportOrder = (params) => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
        const _this = this;
        axios({
            url: '/hs/admin/TestFCStatusAction/dueInfoDownLoad',
            method: 'post',
            responseType: 'blob',
            data: params
        }).then((res) => {
            hide && hide();
            _this.setState({btnDisabled: false});
            download(res, this.props.intl.formatMessage({id : "page.table.overdue.export"}, {expDate : Date.now()}));
        }).catch(() => {
            hide && hide();
            _this.setState({btnDisabled: false});
        });
    }
    submit2 = (e) => {
        e.preventDefault();
        const _this = this;
        const { form: { validateFields, getFieldsValue } } = this.props;
        validateFields((err, values) => {
            if(err) {
                return;
            }
            const { time } = getFieldsValue();
            const isArr = Array.isArray(time) && time.length > 0;
            const params = {
                yStartTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
                yEndTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : ''
            };
            _this.exportOrder2(params,time[0].format('YYYY-MM-DD'));
        })
    }

    exportOrder2 = (params,_day) => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id : "page.table.exporting"}), 0);
        const _this = this;
        axios({
            url: '/hs/admin/order/customerDownload',
            method: 'post',
            responseType: 'blob',
            data: params
        }).then((res) => {
            hide && hide();
            _this.setState({btnDisabled: false});
            download(res, this.props.intl.formatMessage({id : "page.table.customer.service.export"}, {expDate : _day}));
        }).catch(() => {
            hide && hide();
            _this.setState({btnDisabled: false});
        });
    }



    render() {
        const { form: { getFieldDecorator }, intl } = this.props;
        const { btnDisabled } = this.state;
        return (
            <div>
              {/* <div>
                  <Form layout="inline" onSubmit={this.submit}>
                      <FormItem>
                          {
                              getFieldDecorator('time', {
                                  initialValue: [],
                                  rules: [
                                      { required: true, message: '不能为空' }
                                  ]
                              })(
                                  <RangePicker placeholder={['请选择', '请选择']} format={'YYYY-MM-DD'}/>
                              )
                          }
                      </FormItem>
                      <FormItem>
                          <Button type={'primary'} disabled={btnDisabled} htmlType={'submit'}>导出</Button>
                      </FormItem>
                  </Form>
              </div> */}
              <div>
                  <Form layout="inline" onSubmit={this.submit2}>
                      <FormItem>
                          {
                              getFieldDecorator('time', {
                                  initialValue: this.initTime,
                                  rules: [
                                      { required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }
                                  ]
                              })(
                                  <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.select"}), intl.formatMessage({id : "page.search.list.select"})]} format={'YYYY-MM-DD'}/>
                              )
                          }
                      </FormItem>
                      <FormItem>
                          <Button type={'danger'} disabled={btnDisabled} htmlType={'submit'}><FormattedMessage id="page.search.customer.service" /><FormattedMessage id="page.table.export" /></Button>
                      </FormItem>
                  </Form>
              </div>
            </div>
        );
    }
}

ExportOperator.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default Form.create()(injectIntl(ExportOperator));