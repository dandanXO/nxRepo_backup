import {Product} from "./Product";
import {IndexPageProps} from "../../../../../usecaseFlow/reduxStore";
import {FinalProductType} from "../../index";

type Props = IndexPageProps & {
  calculatingProducts: FinalProductType[];
};

export const RecommendedProductsSection = (props: Props) => {
  return (
    <div className={"flex flex-col"}>
      <div className="font-medium mb-2">Recommended Products</div>
      <div className={"overflow-auto"}>
        {/*NOTICE: 展示根據拉霸計算得到的商品*/}
        {props.calculatingProducts?.map(((product, index) => {
          return (
            <Product key={index} product={product}/>
          )
        }))}
      </div>

    </div>
  )
}
