import {IndiaCountry, MexicoCountry, PakistanCountry, PhilippinesCountry} from '@frontend/shared/domain';
import {useLocation, useNavigate} from 'react-router';
import {renderByCountry} from '../../../modules/i18n';
import IndiaExtendConfirmModal from './i18n/IndiaExtendConfirmModal';
import MexicoExtendConfirmModal from './i18n/MexicoExtendConfirmModal';
import PakistanExtendConfirmModal from './i18n/PakistanExtendConfirmModal';
import PhilippinesExtendConfirmModal from './i18n/PhilippinesExtendConfirmModal';

const ExtendConfirmModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      {renderByCountry(
        {
          [IndiaCountry.country]: <IndiaExtendConfirmModal />,
          [PakistanCountry.country]: <PakistanExtendConfirmModal />,
          [MexicoCountry.country]: <MexicoExtendConfirmModal />,
          [PhilippinesCountry.country]: <PhilippinesExtendConfirmModal />,
        },
        <IndiaExtendConfirmModal />
      )}
      ;
    </div>
  );
};

export default ExtendConfirmModal;
