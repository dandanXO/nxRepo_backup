import React from "react";
import { GetSignInConfigResponse } from "../../../../../external";

interface ICocoMobileDailySignInPageProps {
  onClickToSignIn: () => void
  signInConfig: GetSignInConfigResponse['data']['signInConfig']
  signInAllConfig: GetSignInConfigResponse['data']['signInAllConfig']
  signInTotalDays: GetSignInConfigResponse['data']['signInTotalDays']
  todayIsSignIn: GetSignInConfigResponse['data']['todayIsSignIn']
  vipLevel: GetSignInConfigResponse['data']['vipLevel']
  currentSelectedLevel: number
  setCurrentSelectedLevel: React.Dispatch<React.SetStateAction<number>>
}

const CocoMobileDailySignInPage = ({

}: ICocoMobileDailySignInPageProps) => {
  return (
    <div>CocoMobileDailySignInPage</div>
  )
}

export default CocoMobileDailySignInPage
