import { useEffect, useState } from "react";
import { Navigation } from "../../components/layouts/Navigation";
import { useNavigate } from "react-router-dom";
import { Page } from "../../components/layouts/Page";
import { Input } from "@frontend/mobile/shared/ui";
import { z } from "zod";
import { LoginForm } from "./LoginForm";
import { Outlet } from "react-router-dom";


export const LoginPage = () => {

    const navigate = useNavigate();

    return (
        <Page className="flex flex-col">
            <Navigation
                // back={() => navigate(-1)}
                // to={() => navigate('log-out-modal')}
                // toIcon={<div className={`text-slate-400`}>Exit</div>}
            />
            <div className={`px-4 grow flex flex-col`}>
                <div className={`text-3xl font-bold`}>Create</div>
                <div className={`text-3xl font-bold `}>Your Account</div>
                <div className={`text-sm mt-2 mb-10`}>A 6 digit OTP will be sent via SMS to verify your mobile number</div>
                <div className={`grow flex flex-col`}><LoginForm /></div>
            </div>
            <Outlet/>
        </Page>
    )
}
