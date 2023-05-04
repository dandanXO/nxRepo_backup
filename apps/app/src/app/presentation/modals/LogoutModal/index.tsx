
import React, { useEffect } from "react";
import { Overlay } from "@frontend/mobile/shared/ui";
import { useNavigate, useLocation } from "react-router";
import {Button} from "../../components/layouts/Button";


const LogoutModal = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log('extend location', location)


    const appName = 'App Name';
    const handleLogout = () => {
        console.log('log out')
    }
    return (
        <div>
            <Overlay
                show={true}
                title="Confirm"
                content={(hide: () => void) => {
                    return (
                        <div className={`p-2`}>
                            <div className="text-xl font-bold mb-4">Confirm</div>
                            <div>{`Are you sure you want to exit ${appName}?`}</div>
                            <div className={`flex flex-row mt-6`}>
                                <div className={`grow mr-1.5`}>
                                  <Button
                                    type={"secondary"}
                                    className={"w-full"}
                                    text={"Cancel"}
                                    onClick={() => navigate(-1)}
                                  />
                                </div>
                                <div className={`grow ml-1.5`} >
                                  <Button
                                    className={"w-full"}
                                    text={"Confirm"}
                                    onClick={() => navigate(-1)}
                                  />
                                </div>
                            </div>
                        </div>
                    );
                }}
                // enableTitleHorizontal={true}
            ></Overlay>
        </div>
    );
};

export default LogoutModal;
