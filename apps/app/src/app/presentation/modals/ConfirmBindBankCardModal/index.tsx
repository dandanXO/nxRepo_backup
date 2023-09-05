import { MexicoCountry } from 'libs/shared/domain/src/country/MexicoCountry';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { IndiaCountry } from '../../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from '../../../../../../../libs/shared/domain/src/country/PakistanCountry';
import { PhilippinesCountry } from '../../../../../../../libs/shared/domain/src/country/PhilippinesCountry';
import { renderByCountry } from '../../../modules/i18n';
import { RootState } from '../../../reduxStore';
import { InitialStateType } from '../../../reduxStore/modalSlice';
import MexicoConfirmBindBankCardModal from './i18n/MexicoConfirmBindBankCardModal';
import PakistanConfirmBindBankCardModal from './i18n/PakistanConfirmBindBankCardModal';
import PhilippinesConfirmBindBankCardModal from './i18n/PhilippinesConfirmBindBankCardModal';

const ConfirmBindBankCardModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bindBankcardModal } = useSelector((state: RootState) => state.model);

  return renderByCountry(
    {
      //   [IndiaCountry.country]: <IndiaExtendConfirmModal />,
      [PakistanCountry.country]: (
        <PakistanConfirmBindBankCardModal state={bindBankcardModal} />
      ),
      [MexicoCountry.country]: (
        <MexicoConfirmBindBankCardModal state={bindBankcardModal} />
      ),
      [PhilippinesCountry.country]: (
        <PhilippinesConfirmBindBankCardModal state={bindBankcardModal} />
      ),
    },
    <PakistanConfirmBindBankCardModal state={bindBankcardModal} />
  );
};

export default ConfirmBindBankCardModal;
