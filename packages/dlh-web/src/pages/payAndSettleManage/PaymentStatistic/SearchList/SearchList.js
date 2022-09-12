import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker, Row, Col, Button } from 'antd';
import {injectIntl, FormattedMessage} from "react-intl";

const { RangePicker } = DatePicker;


const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
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
    render() {
        const { form: { getFieldDecorator  }, intl , initTime } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row gutter={40}>
                        <Col span={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id :"page.table.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: initTime
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.select"}), intl.formatMessage({id : "page.search.list.select"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item style={{textAlign:'right'}}>
                                <Button type={'primary'} htmlType={'submit'}><FormattedMessage id="page.search.list.search" /> </Button>
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
    intl: PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    handleSearch: () => {}
};


export default Form.create()(injectIntl(SearchList));