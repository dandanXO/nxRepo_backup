import {Product} from "./Product";
import {IndexPageProps} from "../../../../store";
import {useEffect, useState} from "react";
import {PlatformProduct} from "../../../../api/models/PlatformProduct";

type Props = IndexPageProps & {
  quotaBarTargetPrice: number;
};

export type FinalProductType = PlatformProduct & {
  finalLoanPrice: number;
}
export const RecommendedProductsSection = (props: Props) => {
  const loanInterestRate = props.state.indexAPI?.chargeFeeDetails.find(fee => fee.key === "LOAN_INTEREST");

  const [calculatingProducts, setCalculatingProducts] = useState<FinalProductType[]>()

  useEffect(() => {
    // console.log("==============================")
    const quotaBarTargetPrice = props.quotaBarTargetPrice;
    // console.log("預期要借的總額", quotaBarTargetPrice);

    if(props.state.indexAPI?.products && quotaBarTargetPrice > 0) {
      let currentSelectedProductsPrice = 0;

      // console.log("currentSelectedProductsPrice", currentSelectedProductsPrice)

      const currentSelectedProducts: FinalProductType[] = [];
      let processSuccess = false;

      let firstRoundFinalIndex = 0
      props.state.indexAPI?.products.map((product, index) => {
        if(processSuccess) {
          // NOTE: 已經完成任務，忽略執行
        } else {
          // console.log("currentTotalPrice", currentSelectedProductsPrice)
          // NOTE: 假如加入此商品沒爆掉。
          const tempCurrentSelectedProductsPrice = currentSelectedProductsPrice + product.max;

          if(tempCurrentSelectedProductsPrice <= quotaBarTargetPrice) {
            // NOTE: 實際加入此商品
            const finalProduct: FinalProductType = {
              ...product,
              finalLoanPrice: product.max
            }
            currentSelectedProducts.push(finalProduct);
            // console.log("add product.max", product.max);

            // NOTE: 實際加入後商品的總額
            currentSelectedProductsPrice = currentSelectedProductsPrice + product.max;
            // console.log("added product currentTotalPrice", currentSelectedProductsPrice)
          } else {
            // 不能再借了
            firstRoundFinalIndex = index;
            processSuccess = true;
          }
        }
      })

      // console.log("第一步已借的總商品金額", currentSelectedProductsPrice);
      // console.log("第一步已借的總商品", currentSelectedProducts);

      // NOTICE: second round
      // 還差多少要補
      const remainDistributingQuota = quotaBarTargetPrice - currentSelectedProductsPrice;
      // console.log("最後要補的總商品金額", remainDistributingQuota);

      // 目前商品無法滿足，往下找並且計算範圍
      let nextIndex = firstRoundFinalIndex;
      const maxIndex = props.state.indexAPI?.products?.length - 1;
      // console.log("nextIndex", nextIndex);
      // console.log("maxIndex", maxIndex);

      while(processSuccess && nextIndex <= maxIndex) {
        const nextProduct = props.state.indexAPI?.products[nextIndex];
        // console.log("nextProduct", nextProduct);
        if(
          nextProduct &&
          nextProduct.min <= remainDistributingQuota &&
          remainDistributingQuota < nextProduct.max
        ) {
          // console.log("目前商品可以不借到 max 來達到滿足")
          // console.log("只借: ", remainDistributingQuota);
          // NOTE: 實際商品最後借到的金額
          const finalProduct: FinalProductType = {
            ...nextProduct,
            finalLoanPrice: remainDistributingQuota,
          }
          currentSelectedProducts.push(finalProduct);
          processSuccess = false;
        } else {
          // console.log("下個產品最小金額無法滿足剩餘要借的")
          nextIndex = nextIndex + 1;
        }
      }
      // console.log("currentSelectedProducts", currentSelectedProducts);
      setCalculatingProducts(currentSelectedProducts)
    }

  }, [props.state.indexAPI?.products, props.quotaBarTargetPrice])

  return (
    <div className={"flex flex-col"}>
      <div className="font-medium">Recommended Products</div>

      <div className={"overflow-auto"}>
        {/*NOTICE: 展示根據拉霸計算得到的商品*/}
        {calculatingProducts?.map(((product, index) => {
          return (
            <Product key={index} product={product} loanInterestRate={!loanInterestRate ? 1 : loanInterestRate.counting}/>
          )
        }))}
      </div>

    </div>
  )
}
