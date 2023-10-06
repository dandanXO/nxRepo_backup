import {MexicoCountry, PakistanCountry, PhilippinesCountry} from '@frontend/shared/domain';
import {useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router';
import {renderByCountry} from '../../../modules/i18n';
import {RootState} from '../../../reduxStore';
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
