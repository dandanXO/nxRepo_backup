
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Select from 'react-select';
import { notification } from 'antd';

import useBreakpoint from "../../hooks/useBreakpoint";
import { SectionContainer } from "../../components/container/SectionContainer";
import { Input, InputValue } from "../../components/Inputs/Input";
import { Button, ButtonPro } from "../../components/Buttons/Button";
import { useGetWithdrawLimitMutation, useWithdrawMutation } from "../../../external";
import { environment } from "../../../../environments/environment";
import { AppLocalStorage } from "../../../persistant/localstorage";
import { PageOrModalPathEnum } from "../../PageOrModalPathEnum";
import { useAutoUpdateBalance } from "../../hooks/useAutoUpdateBalance";

import { RootState } from "../../../reduxStore";
import { tcx } from "../../utils/tcx";
import { MobileInput } from "../../components/Inputs/MobileInput";
import { renderByPlatform } from "../../utils/renderByPlatform";
import { WithdrawPanel as CWithdrawPanel } from './env/coco/WithdrawPanel';
import { WithdrawPanel as PWithdrawPanel } from './env/pernambucana/WithdrawPanel'
import { WithdrawPanel as WWithdrawPanel } from './env/wild/WithdrawPanel'



type IWithdrawPanel = {
  onClickToWithdrawRecord: () => void;
}

export const WithdrawPanel = (props: IWithdrawPanel) => {
  return (
    renderByPlatform({
      "coco777bet": (
        <CWithdrawPanel {...props}/>
      ),
      "wild777bet": (
        <WWithdrawPanel {...props}/>
      )
    }, <PWithdrawPanel {...props}/>)
  )
}
