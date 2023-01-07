import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker, Row, Col, Button, Select, Checkbox } from 'antd';
import {injectIntl, FormattedMessage} from "react-intl";

const Option = Select.Option;
const { RangePicker } = DatePicker;
const formItemLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 17},
};

class SearchList extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    submit = (e) => {
        e.preventDefault();
        const { form: { getFieldsValue }, handleSearch } = this.props;
        handleSearch(getFieldsValue());
    }

    retu = () => {
        const { form: { getFieldsValue }, exportRecord } = this.props;
        exportRecord(getFieldsValue());
    }

    renderMerchants = () => {
        const { allMerchants } = this.props;
        if (!allMerchants) return;
        const ele = allMerchants.map(item => <Option key={item.merchantId} value={item.merchantId} >{item.name}</Option>);
        return [<Option value={''} key={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>].concat(ele);
    }


    render() {
        const { form: { getFieldDecorator }, initTime, channelList, isStatistLeng, intl, isSuperAdmin } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row gutter={60}>
                        {isSuperAdmin && (
                            <Col lg={12} xl={8}>
                                <Form.Item {...formItemLayout} label={intl.formatMessage({ id: "page.search.list.merchantName" })}>
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

                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.expiration.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: initTime
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.no.restrict"}), intl.formatMessage({id : "page.search.list.no.restrict"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        {isSuperAdmin && (
                          <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "windowPage.channel"})}>
                              {
                                getFieldDecorator('channelId', {
                                  initialValue: ""
                                })(
                                  <Select initialValue=''>
                                    {channelList.length > 0 && channelList.map((item, i) => {
                                      var idStr = item.id != '' ? '('+item.id+')' :'';
                                      return <Select.Option key={i} value={item.id}>{item.name} {idStr}</Select.Option>
                                    })}
                                  </Select>
                                )
                              }
                            </Form.Item>
                          </Col>
                        )}
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.new.old.user"})}>
                                {
                                    getFieldDecorator('isOldUser', {
                                        initialValue: ""
                                    })(
                                        <Select initialValue=''>
                                            <Select.Option value=""><FormattedMessage id="page.search.list.no.restrict" /></Select.Option>
                                            <Select.Option value="false"><FormattedMessage id="page.search.list.new.user" /></Select.Option>
                                            <Select.Option value="true"><FormattedMessage id="page.search.list.old.user" /></Select.Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id:"page.search.list.extend.statis" })}>
                                {
                                    getFieldDecorator('isStatistLeng', {
                                        initialValue: isStatistLeng
                                    })(
                                        <Checkbox></Checkbox>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item style={{textAlign:'right'}}>
                                <Button type={'primary'} htmlType={'submit'}><FormattedMessage id="page.search.list.search" /></Button>
                                <Button type={'primary'} style={{marginLeft:'10px'}} disabled={this.props.btnDisable} onClick={this.retu}><FormattedMessage id="page.table.export" /></Button>
                           </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>

        );
    }
}
SearchList.propTypes = {
    handleSearch: PropTypes.func,
    initTime: PropTypes.array,
    channelList: PropTypes.array,
    isStatistLeng: PropTypes.bool,
    intl: PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    handleSearch: () => {},
    initTime: [],
    channelList : [],
    isStatistLeng: false,
};

export default Form.create()(injectIntl(SearchList));
