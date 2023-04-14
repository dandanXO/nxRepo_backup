import {Button} from "../../components/layouts/Button";
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {APIBoundaryModuleSlice} from "../../../usecaseFlow/reduxStore/apiBoundaryModuleSlice";

type Props = {
  title?: string;
  message?: string;
}
const APIBoundaryModal = (props: Props) => {
  const dispatch = useDispatch();
  const onClickOK = useCallback(() => {
    dispatch(APIBoundaryModuleSlice.actions.update({
      show: false,
    }))
  }, [])
  return (
    <div className={"loan-agreement-modal z-10 w-screen h-screen bg-black bg-opacity-80 p-5 sticky top-0 bottom-0 flex flex-col justify-center items-center"}>

      <div className={"modal-inner w-11/12 px-3 py-4 bg-white rounded-lg text-center"}>
        <div className={"font-medium mb-3 flex flex-col items-center"}>
          <div>{props.title}</div>
        </div>

        <div className={"flex flex-col mb-3 font-light"}>
          <div>
            {props.message}
          </div>
        </div>

        <div>
          <Button text={"OK"} bgColor={"bg-[#F58B10]"} onClick={onClickOK}/>
        </div>

      </div>


    </div>
  )
}
export default APIBoundaryModal;
