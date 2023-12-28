import {renderByPlatform} from "../../../../utils/renderByPlatform";
import { DepositMobileTable as CDepositMobileTable, WithdrawMobileTable as CWithdrawMobileTable } from "./env/coco/MobileTable"
import { DepositMobileTable as RioDepositMobileTable, WithdrawMobileTable as RioWithdrawMobileTable } from './env/riojungle/MobileTable'


export const DepositMobileTable = () => {

  return renderByPlatform({
    "riojungle777bet": <RioDepositMobileTable />,
  }, <CDepositMobileTable />);
}

export const WithdrawMobileTable = () => {

  return renderByPlatform({
    "riojungle777bet": <RioWithdrawMobileTable />,
  }, <CWithdrawMobileTable />);
}


