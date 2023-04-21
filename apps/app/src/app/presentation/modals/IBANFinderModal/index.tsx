
import React, { useEffect } from "react";
import { Overlay } from "@frontend/mobile/shared/ui";
import { useNavigate, useLocation } from "react-router";
import Button from "../../components/Button";




const IBANFinderModal = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log('IBANFinderModal', location)

    const MethodContent = ({ title, text }: { title: string, text: any}) => {
        return (
            <div className="mb-4">
                <div className="text-sm font-bold">{title}</div>
                <div>{text}</div>
            </div>

        )
    }
    const renderByBank = () => {
        return (
            <div className="text-black text-left">
                <div className="text-base font-bold mt-3 mb-5">How to Get Bank Card IBAN Numbe</div>
                <div className="p-3 bg-slate-200 ">
                    <MethodContent title={'Method 1: '} text={'You can usually find your IBAN number by logging into your online banking, or checking your bank statement'}/>
                    <MethodContent title={'Method 2: Online Search'} text={<a className="text-blue-500" href="https://wise.com/gb/iban/calculator">https://wise.com/gb/iban/calculator</a>}/>

                    <div className="text-sm font-bold"></div>
                   
                </div>
            </div>
        )
    }

    return (
        <div>
            <Overlay
                show={true}
                title="Tips"
                enableClose={true}
                onCancel={() => navigate(-1)}
                enableTitleHorizontal={true}
                content={(hide: () => void) => {
                    return (
                        <div className={`p-2`}>
                            <div className="text-xl font-bold mb-2">Tips</div>
                            <div className="border-b border-solid border-slate-300"></div>
                            {renderByBank()}
                        </div>
                    );
                }}
            // enableTitleHorizontal={true}
            ></Overlay>
        </div>
    );
};

export default IBANFinderModal;
