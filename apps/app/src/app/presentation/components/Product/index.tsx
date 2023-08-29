import { MdExpandLess } from '@react-icons/all-files/md/MdExpandLess';
import { MdExpandMore } from '@react-icons/all-files/md/MdExpandMore';
import cx from 'classnames';
import { useCallback, useState } from 'react';

import { environment } from '../../../../environments/environmentModule/environment';
import { formatPrice } from '../../../modules/format/formatPrice';
import Money from '../Money.tsx';
import { Checkbox, ICheckboxProps } from '../Checkbox';
import { FinalProductType } from '../../pages/IndexPage';
import { renderByCountry } from '../../../modules/i18n';
import { IndiaCountry } from 'libs/shared/domain/src/country/IndiaCountry';
import { IndiaProduct } from './i18n/IndiaProduct';
import { MexicoCountry } from 'libs/shared/domain/src/country/MexicoCountry';
import { MexicoProduct } from './i18n/MexicoProduct';
import { IChargeFeeDetails } from '../../../api/loanService/GetReservationResponse';


type Props = {
  product: FinalProductType;
  checkable?: boolean;
  checkboxProps?: ICheckboxProps;
  chargeFeeDetails?: IChargeFeeDetails[];
}

export const Product = (props: Props) => {
  return (
    <div>
      {renderByCountry(
        {
          [IndiaCountry.country]: (
            <IndiaProduct {...props} />
          ),
          [MexicoCountry.country]: (
            <MexicoProduct {...props} />
          ),
        },
        <IndiaProduct {...props} />
      )}
    </div>
  );
};
