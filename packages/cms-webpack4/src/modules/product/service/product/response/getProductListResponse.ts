import {GetProductListResponseProduct} from "../domain/getProductList";

export interface GetProductListResponse extends Array<GetProductListResponseProduct> {
    data: GetProductListResponseProduct[];
}
