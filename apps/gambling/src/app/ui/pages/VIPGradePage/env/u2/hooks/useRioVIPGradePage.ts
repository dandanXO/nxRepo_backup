import { useEffect, useState } from "react";
import { GetVIPInfoResponse } from "../../../../../../external/UserEndpoint";


export const useRioVIPGradePage = (currentLevel: number, userVIPScore?: GetVIPInfoResponse['data']['vip_score']) => {
  const [selectedVIP, setSelectedVIP] = useState(currentLevel);

  useEffect(() => {
    if(userVIPScore !== undefined) {
      if(userVIPScore === 0) {
        setSelectedVIP(0);
      }else {
        setSelectedVIP(currentLevel === 25 ? currentLevel : currentLevel + 1)
      }
    }
  }, [currentLevel, userVIPScore])

  return {
    selectedVIP,
    setSelectedVIP
  }
}
