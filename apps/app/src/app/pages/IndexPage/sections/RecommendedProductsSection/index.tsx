import {Product} from "./Product";

export const RecommendedProductsSection = () => {
  return (
    <div className={"flex flex-col"}>
      <div className="font-medium">Recommended Products</div>

      <div className={"overflow-auto"}>
        <Product/>
        <Product/>
      </div>

    </div>
  )
}
