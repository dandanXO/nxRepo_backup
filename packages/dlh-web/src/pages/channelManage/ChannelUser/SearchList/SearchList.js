import React, { Component } from 'react';
import { Form, DatePicker, Row, Col, Button, Input,Select} from 'antd';
import PropTypes from 'prop-types';
import { axios } from 'utils';
import {injectIntl, FormattedMessage} from "react-intl";

const { RangePicker } = DatePicker;


const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
class SearchList extends Component{
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

    handleClick = () => {
        const { handleSearch, form: { getFieldsValue } } = this.props;
        handleSearch(getFieldsValue());
    }

    render() {
        const { form: { getFieldDecorator  }, intl  } = this.props;
        let { channelList } = this.state;
        return (
            <div>
                <Form>
                <Row gutter={24}>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "windowPage.add.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.select"}), intl.formatMessage({id : "page.search.list.select"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item  {...formItemLayout} label={intl.formatMessage({id : "page.search.list.channelId"})}>
                                {
                                    getFieldDecorator('channelId', {})(
                                        <Select initialValue=''>
                                            <Select.Option key='' value=''><FormattedMessage id="page.search.list.no.restrict" /></Select.Option>
                                            {channelList.length > 0 && channelList.map((item, i) => {
                                                return <Select.Option key={i} value={item.id}>{item.name}({item.id})</Select.Option>
                                            })}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item  {...formItemLayout} label={intl.formatMessage({id : "page.search.list.channelId"})}>
                                {
                                    getFieldDecorator('userNameLike', {
                                        initialValue: ""
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.channelId.enter"})+'('+intl.formatMessage({id : "page.search.list.support.fuzzy.query"})+')'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.login.account"})}>
                                {
                                    getFieldDecorator('userPhoneLike', {
                                        initialValue: ""
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.login.account.enter"})+'('+intl.formatMessage({id : "page.search.list.support.fuzzy.query"})+')'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.user.status"})}>
                                {
                                    getFieldDecorator('state', {
                                        initialValue: ""
                                    })(
                                        <Select>
                                            <Option value={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>
                                            <Option value={'0'}><FormattedMessage id="page.search.list.disable" /></Option>
                                            <Option value={'1'}><FormattedMessage id="page.table.enabled" /></Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={6} xl={8} style={{textAlign:'right'}}>
                            <Button onClick={this.handleClick} type={'primary'}><FormattedMessage id="page.search.list.search" /></Button>
                        </Col>
                    </Row>
                </Form>
            </div>

        );
    }

}
SearchList.propTypes = {
    handleSearch: PropTypes.func,
    intl: PropTypes.object.isRequired,
}
SearchList.defaultProps = {
    handleSearch() {}
}

export default Form.create()(injectIntl(SearchList));