import { MexicoCountry } from 'libs/shared/domain/src/country/MexicoCountry';
import { useLocation, useNavigate } from 'react-router';

import { IndiaCountry } from '../../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from '../../../../../../../libs/shared/domain/src/country/PakistanCountry';
import { PhilippinesCountry } from '../../../../../../../libs/shared/domain/src/country/PhilippinesCountry';
import { renderByCountry } from '../../../modules/i18n';
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
