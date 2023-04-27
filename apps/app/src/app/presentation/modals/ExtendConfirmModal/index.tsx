import { useNavigate, useLocation } from "react-router";
import { Overlay } from "@frontend/mobile/shared/ui";
import { renderByCountry } from "../../../modules/i18n";
import { IndiaCountry } from "../../../../../../../libs/shared/domain/src/country/IndiaCountry";
import { PakistanCountry } from "../../../../../../../libs/shared/domain/src/country/PakistanCountry";
import IndiaExtendConfirmModal from "./i18n/IndiaExtendConfirmModal";
import PakistanExtendConfirmModal from "./i18n/PakistanExtendConfirmModal";

const ExtendConfirmModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // console.log("ExtendConfirmModal.location.state", location.state)
    return (
        <Overlay
            show={true}
            enableClose={true}
            onCancel={() => navigate(-1)}
            content={(hide: () => void) => {
                return renderByCountry({
                    [IndiaCountry.country]: <IndiaExtendConfirmModal />,
                    [PakistanCountry.country]: <PakistanExtendConfirmModal />
                }, <IndiaExtendConfirmModal />)
            }}
        />

    )
}

export default ExtendConfirmModal;
