import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker, Row, Col, Button, Select } from 'antd';
import { axios } from 'utils';
import {injectIntl, FormattedMessage} from "react-intl";

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
            queryList:[],
            disList:[]
        };
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


    componentDidMount() {
        try {
            const _this = this;
            axios({
                url: '/hs/admin/newStatistics/getOverdueOrderDisManagerList',
                method: 'post'
            }).then((res) => {
                if(res && res.code == '200') {
                    let { data } = res;
                    _this.setState({
                        disList: data
                    });
                }
            });
        } catch (e) {

        }
        try {
            const _this = this;
            axios({
                url: '/hs/admin/newStatistics/getOverdueOrderDisCollectorList',
                method: 'post',
                data: {type:1}
            }).then((res) => {
                if(res && res.code == '200') {
                    let { data } = res;
                    _this.setState({
                        queryList: data
                    });
                }
            });
        } catch (e) {

        }
    }

    renderMerchants = () => {
      const { allMerchants } = this.props;
      if(!allMerchants) return;
      const ele = allMerchants.map(item => <Option key={item.merchantId} value={item.merchantId} >{item.name}</Option>);
      return [<Option value={''} key={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>].concat(ele);
    }
    render() {
        const { form: { getFieldDecorator  }, initTime , intl, isSuperAdmin } = this.props;
        const {queryList,disList } = this.state;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row gutter={40}>
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
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.distribute.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: initTime
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id :"page.search.list.select"}), intl.formatMessage({id :"page.search.list.select"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item  {...formItemLayout} label={intl.formatMessage({id :"page.search.list.assign.personnel"})}>
                                {
                                    getFieldDecorator('disId', {})(
                                        <Select initialValue=''>
                                            <Select.Option key='' value=''><FormattedMessage id="page.search.list.no.restrict" /></Select.Option>
                                            {disList.length > 0 && disList.map((item, i) => {
                                                return <Select.Option key={i} value={item.userId}>{item.trueName}</Select.Option>
                                            })}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item  {...formItemLayout} label={intl.formatMessage({id :"page.search.list.person.name"})}>
                                {
                                    getFieldDecorator('queryId', {})(
                                        <Select initialValue=''>
                                            <Select.Option key='' value=''><FormattedMessage id="page.search.list.no.restrict" /></Select.Option>
                                            {queryList.length > 0 && queryList.map((item, i) => {
                                                return <Select.Option key={i} value={item.userId}>{item.trueName}</Select.Option>
                                            })}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item style={{textAlign:'right'}}>
                                <Button type={'primary'} htmlType={'submit'}><FormattedMessage id="page.search.list.search" /></Button>
                                <Button type={'danger'} style={{marginLeft:'10px'}} disabled={this.props.btnDisable} onClick={this.retu}><FormattedMessage id="page.table.export" /></Button>
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
    intl: PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    handleSearch: () => {},
    initTime: []
};

export default Form.create()(injectIntl(SearchList));
