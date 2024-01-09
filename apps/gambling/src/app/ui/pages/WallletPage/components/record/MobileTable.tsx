import {renderByPlatform} from "../../../../utils/renderByPlatform";
import { DepositMobileTable as CDepositMobileTable, WithdrawMobileTable as CWithdrawMobileTable } from "./env/coco/MobileTable"
import { DepositMobileTable as RioDepositMobileTable, WithdrawMobileTable as RioWithdrawMobileTable } from './env/riojungle/MobileTable'


export const DepositMobileTable = () => {

  return renderByPlatform({
    "u2": <RioDepositMobileTable />,
  }, <CDepositMobileTable />);
}

export const WithdrawMobileTable = () => {

  return renderByPlatform({
    "u2": <RioWithdrawMobileTable />,
  }, <CWithdrawMobileTable />);
}


