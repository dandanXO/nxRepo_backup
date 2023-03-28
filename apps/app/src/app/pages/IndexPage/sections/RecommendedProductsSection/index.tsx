import {Product} from "./Product";
import {IndexPageProps} from "../../../../store";

type Props = IndexPageProps;

export const RecommendedProductsSection = (props: Props) => {
  return (
    <div className={"flex flex-col"}>
      <div className="font-medium">Recommended Products</div>

      <div className={"overflow-auto"}>
        {props.state.indexAPI?.products.map(((product, index) => {
          return (
            <Product key={index} product={product}/>
          )
        }))}
      </div>

    </div>
  )
}
