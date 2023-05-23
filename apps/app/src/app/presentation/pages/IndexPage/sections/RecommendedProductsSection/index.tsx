import { IndexPageProps } from '../../../../../reduxStore';
import { FinalProductType } from '../../index';
import { Product } from './Product';

type Props = IndexPageProps & {
  calculatingProducts: FinalProductType[];
};

export const RecommendedProductsSection = (props: Props) => {
  return (
    <div className={'flex flex-col'}>
      <div className="mb-2 font-medium">Recommended Products</div>
      <div className={'overflow-auto'}>
        {/*NOTICE: 展示根據拉霸計算得到的商品*/}
        {props.calculatingProducts?.map((product, index) => {
          return <Product key={index} product={product} />;
        })}
      </div>
    </div>
  );
};
