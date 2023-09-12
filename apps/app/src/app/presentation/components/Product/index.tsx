import { MdExpandLess } from '@react-icons/all-files/md/MdExpandLess';
import { MdExpandMore } from '@react-icons/all-files/md/MdExpandMore';
import cx from 'classnames';
import { IndiaCountry } from 'libs/shared/domain/src/country/IndiaCountry';
import { MexicoCountry } from 'libs/shared/domain/src/country/MexicoCountry';
import { useCallback, useState } from 'react';

import { PhilippinesCountry } from '../../../../../../../libs/shared/domain/src/country/PhilippinesCountry';
import { environment } from '../../../../environments/environmentModule/environment';
import { IChargeFeeDetails } from '../../../api/loanService/GetReservationResponse';
import { formatPrice } from '../../../modules/format/formatPrice';
import { renderByCountry } from '../../../modules/i18n';
import { FinalProductType } from '../../pages/IndexPage';
import { Checkbox, ICheckboxProps } from '../Checkbox';
import Money from '../Money.tsx';
import { IndiaProduct } from './i18n/IndiaProduct';
import { MexicoProduct } from './i18n/MexicoProduct';
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
