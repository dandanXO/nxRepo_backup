import {Button} from "../../components/layouts/Button";

export const QRSuccessModal = () => {
  return (
    <div className={"loan-agreement-modal z-10 w-screen h-screen bg-black bg-opacity-80 p-5 sticky top-0 bottom-0 flex flex-col justify-center items-center"}>

      <div className={"modal-inner w-11/12 px-3 py-4 bg-white rounded-lg text-center"}>
        <div className={"font-medium mb-3 flex flex-col items-center"}>
          <div>Your loan application</div>
          <div>has been submitted</div>
        </div>

        <div className={"flex flex-col mb-3 font-light"}>
          <div className={"mb-3"}>
            The loan amount will be based on the latest review result.
          </div>
          <div>
            Please be patient and wait for the review result. You can check the order in the loan records later.
          </div>
        </div>

        <div>
          <Button text={"OK"} bgColor={"bg-[#F58B10]"}/>
        </div>

      </div>


    </div>
  )
}
