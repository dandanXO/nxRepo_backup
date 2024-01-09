import {PageOrModalPathEnum} from "../../../../PageOrModalPathEnum";
import {useNavigate} from "react-router";
import styled from "styled-components";
import {notification} from "antd";
import cx from "classnames";
import {environment} from "../../../../../../environments/environment";

const DailySignInButton = styled.button<{
  disable: boolean;
}>`
  ${(props) => props.disable ? (
  `background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZwAAABQCAYAAAAtHMNCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk2MEEwM0JDNkQ2NjExRUU4M0IzOTdGMjNBRUJBQTJBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk2MEEwM0JENkQ2NjExRUU4M0IzOTdGMjNBRUJBQTJBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTYwQTAzQkE2RDY2MTFFRTgzQjM5N0YyM0FFQkFBMkEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTYwQTAzQkI2RDY2MTFFRTgzQjM5N0YyM0FFQkFBMkEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7WIE7TAAAKPUlEQVR42uzd2W9c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) center center no-repeat;`
): (
  `background: url("assets/${environment.uVersion}/btn_agora.png") center center no-repeat;`
)};
  //background-size: 100% 100%;
  //background-position: 0 5px;
  width: 190px;
`


type IFooter = {
  onClickToSignIn: () => void;
  todayIsSignIn: boolean;
  vipLevel: number;
  setCurrentSelectedLevel: React.Dispatch<React.SetStateAction<number>>;
}
export const Footer = (props: IFooter) => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  // const user: IUserInfo = AppLocalStorage.getItem("userInfo") ? JSON.parse(AppLocalStorage.getItem("userInfo") || ""): {};

  // const userInfo = useSelector((state: RootState) => state.app?.userStore?.userinfo)

  const disableButton = props.vipLevel === 0 || props.todayIsSignIn;

  return (
    <>
      {contextHolder}
      <div className={"flex flex-col justify-center items-center"}>
        <DailySignInButton
          disable={disableButton}
          className={cx("text-lg text-[498D68] rounded-2xl p-4", {
            "!bg-[gray] !bg-none": disableButton,
          })}
          onClick={() => {
            props.setCurrentSelectedLevel(props.vipLevel || 0);
            if(props.todayIsSignIn) {
              api.error(({
                message: "Você concluiu o check-in hoje"
              }))
              return;
            }
            if(disableButton) {
              api.error({
                message: "O VIP 0 temporariamente não suporta"
              })
              return;
            } else {
              props.onClickToSignIn();
            }}
          }
        >Coletar cupo</DailySignInButton>
      </div>

      <section className={"flex flex-row justify-end bg-orange"} onClick={() => {
        navigate(PageOrModalPathEnum.DailySingInRecordPage);
      }}>
        <div className={"text-white text-lg text-center md:text-right"}>visualizar registros {'>'}</div>
      </section>
    </>
  )
}
