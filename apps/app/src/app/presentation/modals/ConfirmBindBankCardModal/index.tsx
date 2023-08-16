

import { useLocation, useNavigate } from 'react-router';
import { IndiaCountry } from '../../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from '../../../../../../../libs/shared/domain/src/country/PakistanCountry';
import { renderByCountry } from '../../../modules/i18n';
import PakistanConfirmBindBankCardModal from './i18n/PakistanConfirmBindBankCardModal';
import { InitialStateType } from '../../../reduxStore/modalSlice';
import { MexicoCountry } from 'libs/shared/domain/src/country/MexicoCountry';
import MexicoConfirmBindBankCardModal from './i18n/MexicoConfirmBindBankCardModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reduxStore';

const ConfirmBindBankCardModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { bindBankcardModal } = useSelector((state: RootState) => state.model);

    return (

        renderByCountry(
            {
                //   [IndiaCountry.country]: <IndiaExtendConfirmModal />,
                [PakistanCountry.country]: <PakistanConfirmBindBankCardModal state={bindBankcardModal} />,
                [MexicoCountry.country]: <MexicoConfirmBindBankCardModal state={bindBankcardModal} />,
            },
            <PakistanConfirmBindBankCardModal state={bindBankcardModal} />
        )

    );
};

export default ConfirmBindBankCardModal;
