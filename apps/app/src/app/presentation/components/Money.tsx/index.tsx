import { formatPrice } from "../../../modules/formatPrice";
import { renderByCountry } from "../../../modules/i18n";
import { IndiaCountry } from "libs/shared/domain/src/country/IndiaCountry";
import { PakistanCountry } from "libs/shared/domain/src/country/PakistanCountry";
import { environment } from "apps/app/src/environments/environment";

interface IMoney {
    money: number | string;
    currencyStyle?: string;
    moneyStyle?: string;
    isNagetive?: boolean;
}
const Money = (props: IMoney) => {

    const price = formatPrice(Number(props.money || 0));
    const currency = environment.currency;

    return (
        renderByCountry({
            [IndiaCountry.country]: (<div className="ml-1">{`${currency} ${price}`}</div>),
            [PakistanCountry.country]: (
                <div className="flex justify-center items-baseline">
                    {props.isNagetive && <div className="mr-1">-</div>}
                    <div className={`${props.moneyStyle} mr-1 `|| ''}>{price}</div>
                    <div className={props.currencyStyle || ''}>{currency}</div>
                </div>
            ),
        }, (<div className="ml-1">{`${currency} ${price}`}</div>))
    )
}

export default Money;