import { IndexPageProps } from '../../../../../reduxStore';
import { FinalProductType } from '../../index';
// import { Product } from './Product';
import { Product } from '../../../../components/Product';

type Props = IndexPageProps & {
  calculatingProducts: FinalProductType[];
};

export const RecommendedProductsSection = (props: Props) => {
  return (
    <div className={'flex flex-col'} data-testing-id="recommended-products">
      <div className="my-2 font-bold text-ctext-primary text-sm">Recommended Products</div>
      <div className={'overflow-auto'}>
        {/*NOTICE: 展示根據拉霸計算得到的商品*/}
        {props.calculatingProducts?.map((product, index) => {
          return <Product key={index} product={product} />;
        })}
      </div>
    </div>
  );
};
