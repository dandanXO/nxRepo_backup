import { IndiaCountry } from '@frontend/shared/domain';
import { MexicoCountry } from '@frontend/shared/domain';

import { PhilippinesCountry } from '@frontend/shared/domain';
import {IChargeFeeDetails} from '../../../externel/backend/loanService/GetReservationResponse';
import {renderByCountry} from '../../../modules/i18n';
import {FinalProductType} from '../../pages/IndexPage';
import {ICheckboxProps} from '../../core-components/Checkbox';
import {IndiaProduct} from './i18n/IndiaProduct';
import {MexicoProduct} from './i18n/MexicoProduct';
import PhilippinesProduct from './i18n/PhilippinesProduct';

type Props = {
  product: FinalProductType;
  checkable?: boolean;
  checkboxProps?: ICheckboxProps;
  chargeFeeDetails?: IChargeFeeDetails[];
};

export const Product = (props: Props) => {
  return (
    <div>
      {renderByCountry(
        {
          [IndiaCountry.country]: <IndiaProduct {...props} />,
          [MexicoCountry.country]: <MexicoProduct {...props} />,
          [PhilippinesCountry.country]: <PhilippinesProduct {...props} />,
        },
        <IndiaProduct {...props} />
      )}
    </div>
  );
};
