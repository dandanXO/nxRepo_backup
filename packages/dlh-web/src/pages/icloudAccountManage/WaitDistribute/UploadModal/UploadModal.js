import React, {Component} from 'react';
import { Modal, Form, Input} from 'antd';
import PropTypes from 'prop-types';
const {TextArea} = Input;
class UploadModal extends Component {
    constructor(props) {
        super(props);
    }

    handleOk = () => {
        const { form: { getFieldsValue }, handleOk } = this.props;
        const obj = getFieldsValue();
        handleOk(obj);
    }
    // `iCloud格式如下:${String.fromCharCode(10)} aa,bb,cc,dd`
    render() {
        const { handleCancel, visible, loading, form: { getFieldDecorator } } = this.props;
        return (
            <Modal
                onOk={this.handleOk}
                onCancel={handleCancel}
                width={500}
                confirmLoading={loading}
                visible={visible}
                title={'上传iCloud帐号'}
            >
                <Form>
                    <Form.Item>
                        {
                            getFieldDecorator('text', {
                                initialValue: ''
                            })(
                                <TextArea
                                    rows={5}
                                    placeholder={'icloud'}/>
                            )
                        }
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
UploadModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    text: PropTypes.string,
}
UploadModal.defaultProps = {
    visible: false,
    loading: false,
    handleOk: () => {},
    handleCancel: () => {},
    text: ''
}

export default Form.create({
    mapPropsToFields(props){
        return {
            text: Form.createFormField({
                value: props.text
            })
        }
    }
})(UploadModal);