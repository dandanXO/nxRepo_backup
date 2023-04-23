import {Button} from "../../../components/layouts/Button";

export const AuthenticationSection = () => {
  return (
    <div className={"authentication"}>
      <Button dataTestingID={"limit-button"} text={"Get my limit"} className={"bg-blue-500"}/>
    </div>
  )
}
