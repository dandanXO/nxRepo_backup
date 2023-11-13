import React from "react";
import { GetVIPInfoResponse } from "../../../external";

interface ICoco777BetMyPageProps {
  userVIPInfo?: GetVIPInfoResponse
  currentLevel: number
}

const Coco777BetMyPage = ({
  userVIPInfo,
  currentLevel
}: ICoco777BetMyPageProps) => {
  return (
    <>
      Coco777BetMyPage VIP:{currentLevel}
    </>
  )
}

export default Coco777BetMyPage;
