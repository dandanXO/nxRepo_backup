import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker, Row, Col, Button, Select } from 'antd';
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

    render() {
        const { form: { getFieldDecorator  }, initTime, channelList, intl  } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row gutter={40}>
                        <Col span={6}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.overdue.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: initTime
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.select"}), intl.formatMessage({id : "page.search.list.select"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={6}>
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
    channelList: PropTypes.array,
    intl: PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    handleSearch: () => {},
    initTime: [],
    channelList : [],
};

export default Form.create()(injectIntl(SearchList));