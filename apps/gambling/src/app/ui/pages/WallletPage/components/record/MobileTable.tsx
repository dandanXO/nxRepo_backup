import {renderByUVersion} from "../../../../utils/renderByUVersion";
import { DepositMobileTable as CDepositMobileTable, WithdrawMobileTable as CWithdrawMobileTable } from "./env/coco/MobileTable"
import { DepositMobileTable as RioDepositMobileTable, WithdrawMobileTable as RioWithdrawMobileTable } from './env/riojungle/MobileTable'


export const DepositMobileTable = () => {

  return renderByUVersion({
    "u2": <RioDepositMobileTable />,
  }, <CDepositMobileTable />);
}

export const WithdrawMobileTable = () => {

  return renderByUVersion({
    "u2": <RioWithdrawMobileTable />,
  }, <CWithdrawMobileTable />);
}


