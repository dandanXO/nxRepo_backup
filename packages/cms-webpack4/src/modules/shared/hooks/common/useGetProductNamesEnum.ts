
import { useEffect, useState } from "react";
import { useLazyGetProductNamesQuery } from "../../api/productNameApi";


const useGetProductNamesEnum = () => {

    // 产品列表下拉选单
    const [triggerGetProductNames, { currentData, isSuccess }] = useLazyGetProductNamesQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [productNamesEnum, setProductNamesEnum] = useState(null)

    useEffect(() => {

        let productNames = new Map().set('', { text: '不限' });
        currentData && currentData?.map((i) => {
            return productNames.set(i.productId, { text: i.productName })
        });
        setProductNamesEnum(productNames)

    }, [isSuccess])


    return { triggerGetProductNames, productNamesEnum }
}

export default useGetProductNamesEnum;