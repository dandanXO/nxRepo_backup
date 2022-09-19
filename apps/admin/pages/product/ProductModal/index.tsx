import {message, Modal, Upload, UploadProps} from 'antd';
import {ProductModalType} from "../index";
import React, {useCallback} from "react";
import {useProductForm} from "../hooks/useProductForm";


const ProductModal = ({ setProductModalVisible }: ProductModalType) => {
  const {productForm, ProductForm} = useProductForm();

  const handleCloseModal = () => {
      setProductModalVisible(false)
      productForm.resetFields()
  }

  return (
    <Modal
      title="添加产品"
      open={true}
      onCancel={handleCloseModal}
      onOk={productForm.submit}
      width={'800px'}
      maskClosable={false}
    >
      <ProductForm/>
    </Modal>
  )
}

export default ProductModal;

