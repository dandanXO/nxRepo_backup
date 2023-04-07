import { RiCustomerServiceLine, FiEye, FiEyeOff } from "react-icons/all";
import React, { useCallback, useState } from "react";
import { IndexPageProps, RootState } from "../../../../usecaseFlow/reduxStore";

type Props = IndexPageProps & {
    onClickToCustomerService: () => void;
};

export const UserInfoSupportField = (props: Props) => {
    const userName = props.state.user.userName.slice(0, 3) + "****" + props.state.user.userName.slice(7, 10);
    const [isHideUserName, setIsHideUserName] = useState(true)
    return (
        <div className={"w-full flex flex-row justify-between "}>
            <div className={"left-section flex flex-row items-center"}>
                <div data-testing-id="welcome" className={"welcome pr-2 font-medium"}>
                    Welcome {isHideUserName ? userName : props.state.user.userName}
                </div>
                <div className={"hide-icon"} onClick={() => setIsHideUserName(!isHideUserName)}>
                    {isHideUserName ? <FiEyeOff /> : <FiEye />}
                </div>
            </div>
            <div className={"right-section"}>
                <div className={"contact-icon"} onClick={props.onClickToCustomerService}>
                    <RiCustomerServiceLine />
                </div>
            </div>
        </div>
    )
}
