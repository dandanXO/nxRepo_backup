import { useNavigate, useLocation } from "react-router";
import {
    Overlay,
    Title,
    Divider,
    ListItem,
} from "@frontend/mobile/shared/ui";
import {Button} from "../../components/layouts/Button";

type SetPrimarySuccessModalProps = {
    setIsSetPrimarySuccess: React.Dispatch<React.SetStateAction<boolean>>;
};
export const SetPrimarySuccessModal = (props: SetPrimarySuccessModalProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Overlay
            show={true}
            enableClose={false}
            onCancel={() => props.setIsSetPrimarySuccess(false)}
            content={(hide: () => void) => {
                return <div className={`px-6 py-3`}>
                    <div className="font-bold mt-8 mb-14 text-lg">Main card set up successfully!</div>
                    <div>
                      <Button
                        className={"w-full"}
                        text={"OK"}
                        onClick={() => props.setIsSetPrimarySuccess(false)}
                      />
                    </div>
                </div>
            }}
        />

    )
}
