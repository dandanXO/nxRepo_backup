import { useLocation, useNavigate } from 'react-router';
import { IndiaCountry } from '../../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from '../../../../../../../libs/shared/domain/src/country/PakistanCountry';
import { renderByCountry } from '../../../modules/i18n';
import IndiaExtendConfirmModal from './i18n/IndiaExtendConfirmModal';
import PakistanExtendConfirmModal from './i18n/PakistanExtendConfirmModal';
import { MexicoCountry } from 'libs/shared/domain/src/country/MexicoCountry';
import MexicoExtendConfirmModal from './i18n/MexicoExtendConfirmModal';

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
                },
                <IndiaExtendConfirmModal />
            )};
        </div>
    );
};

export default ExtendConfirmModal;
