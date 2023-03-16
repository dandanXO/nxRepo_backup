import { API } from "./index";
import { ProductNameSelect } from "./commonSelectTypes/getProductNameSelect";

const ProductNamesApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/commons/product-names 产品列表下拉选单
        getProductNames: builder.query<ProductNameSelect, null>({
            query: () => ({
                url: `/commons/product-names`,
                params: {},
                method: "get",
            }),
        }),
    })
})
export const {
    useLazyGetProductNamesQuery
} = ProductNamesApi;
