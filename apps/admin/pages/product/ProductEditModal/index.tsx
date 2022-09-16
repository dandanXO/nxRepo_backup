import React from "react";
import {ProductEditModalVisible} from "../index";

interface IProductEditModal {
  setProductEditModalVisible: React.Dispatch<React.SetStateAction<ProductEditModalVisible>>;

}
const ProductEditModal = (props: IProductEditModal) => <div>ProductEditModal</div>

export default ProductEditModal;
