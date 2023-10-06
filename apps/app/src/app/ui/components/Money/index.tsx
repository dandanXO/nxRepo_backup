import {IndiaCountry, MexicoCountry, PakistanCountry, PhilippinesCountry} from '@frontend/shared/domain';
import {environment} from '../../../../environments/environmentModule/environment';
import {formatPrice} from '../../../modules/format/formatPrice';


interface IMoney {
  money: number | string;
  currencyStyle?: string;
  moneyStyle?: string;
  isNagetive?: boolean;
  negativePosition?: 'left' | 'inner';
  isAdd?: boolean;
}
const Money = ({ negativePosition = 'left', ...props }: IMoney) => {
  const price = formatPrice(Number(props.money || 0));
  return (
    <div className="flex items-baseline">
      {props.isAdd && <div className="mr-1">+</div>}
      {props.isNagetive && negativePosition === 'left' && (
        <div className="mr-1">-</div>
      )}
      {[
        IndiaCountry.country,
        MexicoCountry.country,
        PhilippinesCountry.country,
      ].includes(environment.country) && (
        <div className={`${props.currencyStyle || ''} mr-1`}>
          {environment.currency}
        </div>
      )}
      {props.isNagetive && negativePosition === 'inner' && <div>-</div>}
      <div className={`${props.moneyStyle || ''}`}>{price}</div>
      {environment.country === PakistanCountry.country && (
        <div className={`${props.currencyStyle || ''} ml-1`}>
          {environment.currency}
        </div>
      )}
    </div>
  );
};

export default Money;
