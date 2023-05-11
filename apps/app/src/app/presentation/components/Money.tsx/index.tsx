import { formatPrice } from '../../../modules/formatPrice';
import { renderByCountry } from '../../../modules/i18n';
import { IndiaCountry } from 'libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from 'libs/shared/domain/src/country/PakistanCountry';
import { environment } from 'apps/app/src/environments/environment';

interface IMoney {
  money: number | string;
  currencyStyle?: string;
  moneyStyle?: string;
  isNagetive?: boolean;
  isAdd?: boolean;
}
const Money = (props: IMoney) => {
  const price = formatPrice(Number(props.money || 0));
  return (
    <div className="flex justify-center items-baseline">
      {props.isAdd && <div className="mr-1">+</div>}
      {props.isNagetive && <div className="mr-1">-</div>}
      {environment.country === IndiaCountry.country && (
        <div className={`${props.currencyStyle || ''} mr-1`}>
          {environment.currency}
        </div>
      )}
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
