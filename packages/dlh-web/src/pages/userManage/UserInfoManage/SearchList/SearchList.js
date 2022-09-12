import React, { Component } from 'react';
import { Form, Row, Col, Input, DatePicker, Select, Button, Radio, InputNumber, message } from 'antd';
import styles from '../UserInfoManage.less';
import PropTypes from 'prop-types';
import { axios, userStatus } from 'utils';
import { injectIntl } from 'react-intl';
const { RangePicker } = DatePicker;
const Option = Select.Option;


const formItemLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 17},
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
        const { intl,form: { getFieldsValue }, submit } = this.props;
        const params = getFieldsValue();
        if (params.noLoanAgainStartDays > params.noLoanAgainEndDays) {
            message.warning(intl.formatMessage({ id: "page.search.clear.no.repeat.loan.days" }) + intl.formatMessage({ id: "page.search.format.incorrect" }));
            return;
        }
        submit(params);
    }

    renderNoLoanAgainDays = () => {
        const { intl } = this.props;
        let options = [];
        for (let i = 1; i <= 10; i++) {
            options.push(<Select.Option key={i} value={i}>{`${i}${intl.formatMessage({ id: "windowPage.day" })}`}</Select.Option>)
        }
        return options
    }

    renderUserStatus = () => {
        return Object.entries(userStatus).map(([value, statusName]) => {
            return <Select.Option key={value} value={value}>{statusName}</Select.Option>
        });
    }
   
    render() {
        const {form: {getFieldDecorator}, intl} = this.props;
        let { channelList } = this.state;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id: "page.search.list.reg.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id: "page.search.list.select"}), intl.formatMessage({id: "page.search.list.select"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id: "page.search.list.status"})}>
                                {
                                    getFieldDecorator('status', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}>{intl.formatMessage({id: "page.search.list.no.restrict"})}</Option>
                                            <Option value={'0'}>{intl.formatMessage({id: "page.search.list.normal"})}</Option>
                                            <Option value={'1'}>{intl.formatMessage({id: "page.search.list.blacklist"})}</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id: "page.search.list.name"})}>
                                {
                                    getFieldDecorator('nameTrue', {
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
                                    getFieldDecorator('phoneNo', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={intl.formatMessage({id: "page.search.list.mobile.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id: "page.search.list.real.name"})} >
                                {
                                    getFieldDecorator('rnStatus', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}>{intl.formatMessage({id: "page.search.list.no.restrict"})}</Option>
                                            <Option value={'1'}>{intl.formatMessage({id: "page.search.list.real.name.yes"})}</Option>
                                            <Option value={'0'}>{intl.formatMessage({id: "page.search.list.real.name.no"})}</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id: "page.search.list.has.order"})}>
                                {
                                    getFieldDecorator('hasOrder', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}>{intl.formatMessage({id: "page.search.list.no.restrict"})}</Option>
                                            <Option value={'1'}>{intl.formatMessage({id: "page.search.list.has.order.yes"})}</Option>
                                            <Option value={'0'}>{intl.formatMessage({id: "page.search.list.has.order.no"})}</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item  {...formItemLayout} label={intl.formatMessage({ id: "page.search.list.channelId" })}>
                                {
                                    getFieldDecorator('channelId', { initialValue: '' })(
                                        <Select >
                                            <Select.Option key='' value=''>{intl.formatMessage({ id: "page.search.list.no.restrict" })}</Select.Option>
                                            {channelList.length > 0 && channelList.map((item, i) => {
                                                return <Select.Option key={i} value={item.id}>{item.name}({item.id})</Select.Option>
                                            })}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id: "page.search.clear.no.repeat.loan"})} >
                                {
                                    getFieldDecorator('noLoanAgain', {
                                        initialValue: false
                                    })(
                                        <Radio.Group>
                                            <Radio.Button value={true}>{intl.formatMessage({ id: "page.table.yes" })}</Radio.Button>
                                            <Radio.Button value={false}>{intl.formatMessage({ id: "page.table.no" })}</Radio.Button>
                                        </Radio.Group>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8} >
                            <Form.Item className={styles.formItemNoLoanAgainDays} {...formItemLayout} label={intl.formatMessage({ id: "page.search.clear.no.repeat.loan.days" })}>
                                <Input.Group compact >
                                    <Form.Item>
                                        {
                                            getFieldDecorator('noLoanAgainStartDays', { initialValue: 1 })(
                                                    <InputNumber min={1} max={10} /> 
                                            )
                                        }
                                    </Form.Item>
                                     <div className={styles.formItemText}>~</div>
                                    <Form.Item>
                                        {
                                            getFieldDecorator('noLoanAgainEndDays', { initialValue: 10 })(
                                                    <InputNumber min={1} max={10}  addonAfter='+'/>
                                            )
                                        }
                                    </Form.Item>
                                    <div className={styles.formItemText}>{intl.formatMessage({ id: "windowPage.day" })}</div>
                                </Input.Group>
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.exam.status"})}>
                                {
                                    getFieldDecorator('userStatus', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}>{intl.formatMessage({id: "page.search.list.no.restrict"})}</Option>
                                            <Option value={'11'}>{intl.formatMessage({id: "order.status.eleven"})}</Option>
                                            {this.renderUserStatus()}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={24} xl={24} style={{textAlign:'right'}}>
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
    intl : PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    submit: () => {

    }
}

export default Form.create()(injectIntl(SearchList));