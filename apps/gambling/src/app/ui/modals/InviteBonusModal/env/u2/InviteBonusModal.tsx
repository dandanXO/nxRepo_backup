import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import {renderByRWD} from "../../../../utils/renderByRWD";
import {SharedInviteBonusModal} from "./SharedInviteBonusModal";
import {IInitialChargeModal} from "../../index";

export const InviteBonusModal = (props: IInitialChargeModal) => {
  const device = useBreakpoint();

  return renderByRWD( {
    shared: <SharedInviteBonusModal onConfirm={props.onConfirm} close={props.close}/>,
  }, device)
}
