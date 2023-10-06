import { IndexPageProps } from '../../../../../reduxStore';
// import { Product } from './Product';
import { Product } from '../../../../components/Product';
import { FinalProductType } from '../../index';

type Props = IndexPageProps & {
  calculatingProducts: FinalProductType[];
};

export const RecommendedProductsSection = (props: Props) => {
  return (
    <div className={'flex flex-col'} data-testing-id="recommended-products">
      <div className="text-ctext-primary my-2 text-sm font-bold">
        Recommended Products
      </div>
      <div className={'overflow-auto'}>
        {/*NOTICE: 展示根據拉霸計算得到的商品*/}
        {props.calculatingProducts?.map((product, index) => {
          return <Product key={index} product={product} />;
        })}
      </div>
    </div>
  );
};
