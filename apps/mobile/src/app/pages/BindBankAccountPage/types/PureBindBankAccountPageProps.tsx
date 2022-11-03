import {PostBankBindSaveRequest} from "../../../api/postBankBindSave";
import {IGeneralPageLayoutTypeProps} from "./IGeneralPageLayoutTypeProps";

export interface PureBindBankAccountPageProps {
  postBankBindSave: (requestBody: PostBankBindSaveRequest) => any;
  cardholderName: string;
  layout: (props: IGeneralPageLayoutTypeProps) => JSX.Element;
}
