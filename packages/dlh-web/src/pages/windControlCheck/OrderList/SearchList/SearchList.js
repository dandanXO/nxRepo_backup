import React, {Component} from 'react';
import { Form, Row, Col, Input, DatePicker, Select, Button } from 'antd';
import PropTypes from 'prop-types';
import { axios } from 'utils';
const {RangePicker} = DatePicker;
const Option = Select.Option;
import { orderStatus } from 'utils';
import {injectIntl} from "react-intl";


const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};

class SearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channelList : []
        };
    }

    componentDidMount() {
        try {
            const _this = this;
            axios({
                url: '/hs/admin/channel/getChannelList',
                method: 'post',
                data: {pageSize: 1000, pageNum: 1}
            }).then((res) => {
                if(res && res.code == '200') {
                    let { data } = res;
                    _this.setState({
                        channelList: data.records
                    });
                }
            });
        } catch (e) {
    
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form: { getFieldsValue }, submit } = this.props;
        const params = getFieldsValue();
        submit(params);
    }
    renderStatusOption = () => {
        const arr = Object.keys(orderStatus);
        const ele = arr.map((item) => {
            return (
                <Option key={item} value={item}>{orderStatus[item]}</Option>
            );
        });
        return [
        <Option key={''} value={''}>{this.props.intl.formatMessage({id : "page.search.list.no.restrict"})}</Option>
        ].concat(ele);
    }
    render() {
        const {form: {getFieldDecorator}, intl} = this.props;
        let { channelList } = this.state;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                         <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id: "page.search.list.appication.time"})}>
                                {
                                    getFieldDecorator('apyTime', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id: "page.search.list.select"}), intl.formatMessage({id: "page.search.list.select"})]} format={'YYYY-MM-DD'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id: "page.search.list.expiration.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id: "page.search.list.select"}), intl.formatMessage({id: "page.search.list.select"})]} format={'YYYY-MM-DD'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id: "page.search.list.order.status"})}>
                                {
                                    getFieldDecorator('status', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            {this.renderStatusOption()}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id: "page.search.list.order.no"})}>
                                {
                                    getFieldDecorator('orderNo', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={intl.formatMessage({id: "page.search.list.order.no.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id: "page.search.list.name"})}>
                                {
                                    getFieldDecorator('userTrueName', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={intl.formatMessage({id: "page.search.list.name.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id: "page.search.list.mobile"})}>
                                {
                                    getFieldDecorator('userPhone', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={intl.formatMessage({id: "page.search.list.mobile.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item  {...formItemLayout} label={intl.formatMessage({id: "page.search.list.channelId"})}>
                                {
                                    getFieldDecorator('channelId', {})(
                                        <Select initialValue=''>
                                            <Select.Option key='' value=''>{intl.formatMessage({id: "page.search.list.no.restrict"})}</Select.Option>
                                            {channelList.length > 0 && channelList.map((item, i) => {
                                                return <Select.Option key={i} value={item.id}>{item.name}({item.id})</Select.Option>
                                            })}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={16} style={{textAlign:'right'}}>
                            <Button type="primary" htmlType="submit">{intl.formatMessage({id: "page.search.list.search"})}</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

SearchList.propTypes = {
    submit: PropTypes.func,
    intl: PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    submit: () => {

    }
}

export default Form.create()(injectIntl(SearchList));