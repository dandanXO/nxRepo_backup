import {Avatar, AvatarAccountInfo} from "../../templates/PageTemplate/Header";
import styled from "styled-components";
import {RightOutlined} from "@ant-design/icons"
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";

import {appSlice, totalBalanceSheetSelector, totalReasableSelector} from "../../../reduxStore/appSlice";
import { useAllowLoginRouterRules } from "../../router/useAllowLoginRouterRules";
import useBreakpoint from "../../hooks/useBreakpoint";
import {useEffect} from "react";
import { MessageCountBadge } from "../../components/MessageCountBadge";
import {useGetLetterListMutation} from "../../../external";
import {AppLocalStorage} from "../../../persistant/localstorage";
import { IUserStore } from "../../../gateway/socket";
import {useAutoUpdateBalance} from "../../hooks/useAutoUpdateBalance";

const MyPageButtonD = styled.button`
  background-image: url("assets/001/btn_green05.png");
  background-size: 100% 100%;
  padding: 4px 31px;
  font-family: HeeboBold;
  text-shadow: 0 1px 2px #036A02;
`

const MyPageButtonW = styled.button`
  //background: none;
  //border-radius: 0.2rem;
  background-image: url("assets/001/btn_yellow05.png"); /* 设置背景图像的路径 */
  background-size: 100% 100%;
  //box-shadow: 0 0.04rem #036a02, inset 0 0.02rem 0.06rem rgba(255,255,255,.5);

  padding: 4px 40px;
  font-family: HeeboBold;
  text-shadow: 0 1px 2px #036A02;
`;


const ListItem = styled.button.attrs((props) => ({
  className: "text-lg w-full",
}))<{
  last?: boolean;
  first?: boolean;
  // expand?: boolean;
  bottomBorder?: boolean;
}>`
  ${props => (props.first) && `
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  `};

  ${props => (props.last) && `
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  `};

  box-shadow: inset 0 0 36px 5px rgba(255,255,255,.11) !important;
  border-bottom: ${(props) => props.bottomBorder ? "1px rgba(255,255,255,0.2) solid" : "none"};

  padding: 10px 12px;
  text-align: left;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const MyPage = () => {
  useAllowLoginRouterRules();
  const navigate = useNavigate();

  const {updateBalance} = useAutoUpdateBalance();


  const {isMobile} = useBreakpoint();
  console.log("mypage isMobile", isMobile)

  useEffect(() => {
    if(!isMobile) {
      navigate(PageOrModalPathEnum.IndexPage)
    }
  }, [isMobile])


  // const { userAmount } = useSelector((state: RootState) => state.app.userStore as IUserStore)

  const totalBalanceSheetValue = useSelector(totalBalanceSheetSelector);
  const totalReasableValue = useSelector(totalReasableSelector);

  const { messageCount } = useSelector((state: RootState) => state.app)


  const dispatch = useDispatch();

  const [triggerGetLetter, { data }] = useGetLetterListMutation({});

  useEffect(() => {
    triggerGetLetter({
      token: AppLocalStorage.getItem('token') || '',
    });
  }, [])


 return (
  <>

    <div className={"p-4 w-full"}>
      <section className={"profile flex flex-row justify-between items-center mb-4"}>
        <div className={"flex flex-row items-center"}>
          <div className={"mr-4"}>
            <Avatar big={true}/>
          </div>
          <div className={""}>
            <AvatarAccountInfo className={"!items-start"}/>
          </div>
        </div>
        <button className="relative" onClick={() => navigate(PageOrModalPathEnum.NotificationPage)}>
          <img alt={"message"} className="w-[30px] h-[30px]" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIzMDg4NjZENjk5MzExRUU5RUUwOEM0MjFGODdBNDJDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIzMDg4NjZFNjk5MzExRUU5RUUwOEM0MjFGODdBNDJDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjMwODg2NkI2OTkzMTFFRTlFRTA4QzQyMUY4N0E0MkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjMwODg2NkM2OTkzMTFFRTlFRTA4QzQyMUY4N0E0MkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5ydrm2AAADJElEQVR42tSZWWgTQRjHZ2to631RibcgCl4vpT6oRcQDK1iPvni+eKCI6IuKUI8HqyAqgogHgorghSAVKyaoGKn6IB4P6ouopFZEpWpb04CkSeP/2/1itptNMmvb7OQPP8hkZ7v/fLMz831TLd4iuqIxYA4oB9PAcDAExEEIfAVvwDNwDwT/90FazLlRMrIFzAILQYGDe5+Ax+ASeOfIaLRZuu84sBFsAwNE13USnANvpYxG5IxuAKdAkeh+1YD9WY3++ZX1D90EVaJnRe/xPNCU1mg4vdGB/E5NFbkROVkAXtkaDf20vWkE8PNMzqVCvIK8TjHaYm/0Axgv3FEbmAw+m7/0dMRTOvpdNEnqB16CYZ2Mxjp3WsFro9sqARfA+n9D/y05z7wcbo9QR9PBCyOiyaHfqphJ0hEwV4/op+/6F4N5Xy4S6omMBhLv6GZFTZI2GUaNoa8U6moR6OWJxvUZNlNho7RDLqWILhHqq8oTFWJGHhidQBGdlAdGS+gdHeXwpgAnuyPTpH/XwA9hjFSZ5VqMd5x23gWHSj6zD0XUybLk51mY0EGwx9TeBY6Z2nVgMX+O8Jr4lNsHwHMwWuK5xVp9o2h1UFpMBO9N7b6cmmmgEYy19C/nGol0nksZsw6BaonnttJkcmLUGv3CNJ/t+hfbXO8t+dz2Agx9Ey36kpwFhab2UaDxZy84bLo2CFSb2qvAMlO7DKyUfG6YJhOVraWSv4xK5I/gISe31smyG8zmUriCM7KEqKyuBbc4OV7rYG40a3VBvUY/rfjydJuSEl8erKO1NPQNXPmVKmoyohvl7CmgsNEH+vLERs+AHYoavaKXIlGjQTP5ssOZmAvRCcpVa820T0GjO5PlctJoA+/dexUx+UgYZ6opRhNRXQ6mKGC0MtMBBIkOxX6D/i5Xnm3ZjnRq0iQQudJqXi5Fpohud/kdXcOJd4rMEZ0PTri4+1TYRdIaUaqb7rhk8j5YB75k6kQR9XLaluuTEipDjoPrMp09HULcsOSNPamwMLK1u+Cikxspoj4e+u6MKH6/iLIxOtgMcqHnExn+oZBJfwUYAMQSF6v9PklxAAAAAElFTkSuQmCC"}/>
          {messageCount !== 0 && <MessageCountBadge>{messageCount}</MessageCountBadge>}
        </button>
      </section>

      <section className={"total flex flex-row text-white justify-between mb-4"}>

        <div className={"item flex-1"}>
          <div className={"title text-[#ffffff] mb-2"}>Fundos totals</div>
          <div className={"money text-lg mb text-[#fffa73]"}>R${totalBalanceSheetValue}</div>
          <MyPageButtonD onClick={() => {
            navigate(PageOrModalPathEnum.WalletPage)
          }} className={"rounded-xl px-4 py-3 text-white font-bold text-lg"}>Depósito</MyPageButtonD>
        </div>

        <div className={"item flex-1"}>
          <div className={"title text-[#ffffff] mb-2"}>Fundos totals</div>
          <div className={"money text-lg mb text-[#fffa73]"}>R${totalReasableValue}</div>
          <MyPageButtonW onClick={() => {
            navigate(PageOrModalPathEnum.WalletPage)
          }} className={"rounded-xl px-4 py-3 text-white font-bold text-lg"}>Retirar</MyPageButtonW>
        </div>

      </section>

      <div className={"text-white text-lg font-bold text-left mb-2"}>Outras funções</div>

      <section className={"control-item text-white !font-sm"}>
        <ListItem first={true} bottomBorder={true} onClick={() => {
          navigate(PageOrModalPathEnum.WalletPage)
        }}>
          <div className={"flex flex flex-row items-center"}>
            <img alt={"order-record"} className={"w-[16px] h-[20px] mr-2"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAvCAYAAABkBQNlAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNBQUE3NUY0NkE2NzExRUVBREEzREY4QzFDNUI2NTAzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNBQUE3NUY1NkE2NzExRUVBREEzREY4QzFDNUI2NTAzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0FBQTc1RjI2QTY3MTFFRUFEQTNERjhDMUM1QjY1MDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0FBQTc1RjM2QTY3MTFFRUFEQTNERjhDMUM1QjY1MDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4bzoS6AAAB3ElEQVR42uyYv0vDUBDHX2qpdRGUQgUHFTopok66+ANB1LmCm/gf6Obg4iYIgqOrm4LgJDioCF0EF8VBB7FKHSottUpBS9vE72tfl6pJ+nKtL5CDT0nTl3ff3l2S4zQjy5xYG1gCMyAE0uAU7IFP2U01XV7UEDgCfb/8lgBRcCUlqvgmJagbXIvo/GUfYAQ81ru5T8eHBJsgZLGmHWzL7K/l649UQESh1cZa7qMTvNfjwK8blmsWwDroqF5jU1A5E+AFlMT3DNgCu6Y1lcuYbjooasfHaG0CxGQjNdkAQdzGzUVZpJc1xgKmTkuVSGlgHgzXXDDWIFFTYKPm3AM4AAUtlS6f2AeL7P/tHMxqyRSbxsEZU8eiPH0DTC3r54Xeopgof7XQ1VKlpijmRcrFoope+uhE5UGS0GeXVT9m5+67FC9QKrsQLZHbCt1aFG9fnojT57imeP57vCe6W2tKyRfyDVgl9Lkj5hCO0pcVzxYqy1LUVET8OyqLUKSPT1hWvLvPa4ftirIxCnoFJ4Q+50DYafruwTJx6xJ2mr4g6CUUFaRI3yiIN7emvC7BzZHS1YuUwSOVUEzUsw+BOgZ3PGAKEAeHPH1frDJCXmM/B7HNsgK4ZZXBf+5bgAEAALXPs4MHFdUAAAAASUVORK5CYII="}/>
            <span>Registros de cobrança</span>
          </div>
          <RightOutlined style={{ fontSize: 16 }}/>
        </ListItem>

        <ListItem bottomBorder={true} onClick={() => {
          navigate(PageOrModalPathEnum.GameRecordPage)
        }}>
          <div className={"flex flex flex-row items-center"}>
            <img alt={"game-register"} className={"w-[16px] h-[20px] mr-2"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAsCAYAAADikXHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkUyMjUwNjRCNkE2NzExRUVBMDFERDk0ODUyNEIwOTNGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkUyMjUwNjRDNkE2NzExRUVBMDFERDk0ODUyNEIwOTNGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTIyNTA2NDk2QTY3MTFFRUEwMUREOTQ4NTI0QjA5M0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTIyNTA2NEE2QTY3MTFFRUEwMUREOTQ4NTI0QjA5M0YiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4IL9y0AAAC8klEQVR42uyYS2gTQRzGZ9M0mpqagFJ8tT3kUDVY+7AolhY9ltqjDyp48eLJg157L4p6LB6k4CWXgCd7ExS0Iq0PerCIKApSHxhsFW1T2mT9xnwrw7CzWYva0Wbgx/4z+e/Ot988dnccd04ElTPgMngJ+sEbn5wekGN8FNz1yWkEYyANzoOrxhaTrnBKZlFR8AXE+fsKL6iXcXCQ8X3Q7ZMjb+wc4wWwESz7NepAVLTkGkUlFEGCd+lXthtiYTg3zmv72lEj3SgJu4oUFYFTLWAczCk0SQcNDDNnMCBnkDnDATlNWptSQ4ugU5eUMeGVSMDNSPuTIBaQE2NOPCAnwhyvSA1Sy4AcUxlDw++BHHEO6/I8rlOcFpwMQotrtNy8kiOvWTAIbvyhtlhGaHSAArjO3zIeZdzOYyuPI8p5I9p/Xu4oryF4zQLb0Nstz8DZvHiNY7Om+BE4wLwuMEMOgdvM+Qx20tHdrJsGW8AzpWsOgzucmZJJOvkAdGrtTqU2uW1+Lkk6QRakwASYAT0gp+QkwRhIg2mSZl1SyZPn9PIaE/wvyzb8nfrw0dcpr8yDJyAFMoYcuao8ZtwRMEmecm1qB3WGnKmGzW5btBi8bNQZVmh9Fu0LsQRlwq5V0aIrrCtVUeFFCQtFLa/x7jvJBTML9tvQfZMUI8sFcMOG7ptX4tl/c/b9Aafkx8VXsMuWgf4CtIJFcBP0rcyp3+vSLX6teHGfDU4tam8P/9FjZoUDfQlcBPXgrC3PvmtgSPnQ7LfBqefajKu+ulj5lvAQHOPLfq7Cl/NfEyW3f16Re6DXBlELv/J0X9Njqjr7fooqBTtVq8QJJV5viBOGc9V4QyVRpg0Oj1MgBvaAbqX+BDcqtoIBpV7GO0A9OK7Ud3FbSPbM6aA2wzh1BHziBpe6Ru0F70R5B1l1oYHLx5K2KVbL7aVvmpuG7qvcxSa7TVuHUaIXJ4ygME6t0kAvP+WbLdGT95wa4pfHtlUW9NZ7R/suwACTz3PjRWkWFgAAAABJRU5ErkJggg=="}/>
            <span>Registro do jogo</span>
          </div>
          <RightOutlined style={{ fontSize: 16 }}/>
        </ListItem>

        <ListItem bottomBorder={true} onClick={() => {
          navigate(PageOrModalPathEnum.SettingPage)
        }}>
          <div className={"flex flex flex-row items-center"}>
            <img alt={"setting"} className={"w-[16px] h-[20px] mr-2"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAuCAYAAAC1ZTBOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVDNkYzNjFBNkE2NzExRUVCMTczQTJCNjQzMDhERjVCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVDNkYzNjFCNkE2NzExRUVCMTczQTJCNjQzMDhERjVCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUM2RjM2MTg2QTY3MTFFRUIxNzNBMkI2NDMwOERGNUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUM2RjM2MTk2QTY3MTFFRUIxNzNBMkI2NDMwOERGNUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4pga7HAAADD0lEQVR42uyZTWhTQRDHNy9RiIKe9JCbB1GKB1FbQRRqwSpSP0DxE4KCUNCDHjx4aw6CeFTEqkXUgpcaEUQUCoofVQiighF6MAHRprSmSJuCUrEv/qeZB49n3md2N4gO/HhNst38mdnZ3ZnEqpPCshTIgN1giWjcLoBToBds5XnfR5koUa09V4JnYKmQb61gGXgBOkEutEizKmJ43lYkcO47+LkIDEYRmjCFWIvnGqHHLKG7wNMwIlcIvUZCH4Iu8CRouOcJ/ZYED8AO8NhvsAFPiiaRBI/ATr+x5EnVVvH4jKKYBXvBfddwz6oTN5+fd8CmAELXue2jKj3Zys9LYAE4wmuxnn0DMbeJYl/Lc/98Q5HQbnCt4Y3WVLser4J2zuTvPmPfgs/116T6xDnI+NlRcFN34sg7VzV48l8R6T9mAAxL+K5VYI8KT14HxyQ65RZIhxb5y1vkuOTIjanw5EmeOC8p3CdUrMmF4OL/7JawJv+KfbIEDkUtRR22mgu+lOw1eQU8l+QQKrz6QI/scK+nEoNv8Y0azdPm8flM1HB38fbzUYLI5aDF5bNpR+VIzvkJ3gU9Fls8JpdhP7gFYx0cZ8A5/vs4tWmand1UpG0HL+sIJLsMZpu5T1ZsLReqb6gfNcnr37CNyxgksglUQCfIgTjoBW/AKEgD0za2z6A1qZkJsBHkQBz0g26QBFkwDdLABOdBj+5wT4AO3jHioJ8PC2cNfpgvJMO6z+4xXoN5bhyQwP0u2T5uv2jrKsRKXNoWWGCWm1VeyaT1FtSQQB3NgaKo9cuL3Gq5C7a5rFXaL1/rvk8W2YMjLJC6GJt9kknrpVeaQCvcM5IFfgBbOJsXi1rreUOdcaMcet/6iVp/Q7zPxiUJJM+UWeCgy/XMnkz+dzyo+wLOSjhJ8qADlPn1AGirM64E2kEh6NxWEzXDXqB+Iv0wlAjhPbr30Q9Vp8EUv5fikDvtE79fCBOehC1vsowMOyD+7Nzakylc+aBon9zneP2Kj8CRKJOp6JkbfDkY4sjcEy4d3KD2W4ABAIzoqmS3j5elAAAAAElFTkSuQmCC"}/>
            <span>Configuração</span>
          </div>
          <RightOutlined style={{ fontSize: 16 }}/>
        </ListItem>

        <ListItem last={true} onClick={() => {
          dispatch(appSlice.actions.showMobileLogoutModal(true));
        }}>
          <div className={"flex flex flex-row items-center"}>
            <img alt={"log-out"} className={"w-[16px] h-[20px] mr-2"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkY2NDFFOEU3NkE2NzExRUU4RjlERkYzNThGQjQwOEM3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkY2NDFFOEU4NkE2NzExRUU4RjlERkYzNThGQjQwOEM3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjY0MUU4RTU2QTY3MTFFRThGOURGRjM1OEZCNDA4QzciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjY0MUU4RTY2QTY3MTFFRThGOURGRjM1OEZCNDA4QzciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5nLM7AAAACdUlEQVR42szYS2gTQRzH8cm6leQi9qRnH2irCF704K0HFeIDBQ9CffRaPHgS9aL24MGL2Aq24E0vvjCERPSgoCCCIvhAkYIUMaAiQhXRtG6yfkenEpNJu7Ob2ekfPoTsMptfZrP/3UwmnBQztRbL4Il06wOeoK7b6avXERwS7uo+tmCqeUemNil6eH0t3Nc+XG6ZwXooVor5UYu0p7ie/m9OV19R1AcMjQ/2ABMdDPcJF1HRBqyZH3AD7uIMqran1qsxg4ayOIVXyMcYb8SvhbG/nOyZJXXlDSCwMYNxTnFz9eOx6qUWAoYdOc76GGNWqZuDvFlcwAttwKAzAU1b1RI8Qrd6fwDbcM/WDJrW5oZwsnLq99wS0g+c5BOfNdu0IT3bbaKNOyhotudQQt+/NhPYPcWH1e+rW7Ovq82Y/2bSZsC9OBtzrAx5Q/ZamwH7Eo5fjHU2A75MOF5ev29tBhxVDby/4cndpGQTr3gyoCXTGEAXMhqnZxk7iLEgdNcHN+J4m32D6tbX0VudafVGCecy4EP8auqFLeFcBhzHLhzFAtUvr9l8molTZWX250GHAVN9YLUXMBDzPWD452pKWitwMObY77iFH+1O8VNep7EwQcBNStx6o5r3N93/4o/Yj5+OHl6l1dij2+fJv524gh7cVO9d8HXbG6/id9iNrTiP5SleC+9xPWqbuS3+rrYewTFkI3zAcxQSLB5dxReTlQW5KDSESziH7XN8yDOctNJm5lh+k8tsO5DHsFqPSbU8uXIdQRlrcAJVzf5KxOMY8+QMRlTFEHpRbNg+jhGD4xjx6+azLk/7Tsi17aVqZWvK1in+LcAAbxd0RmPzzb4AAAAASUVORK5CYII="}/>
            <span>Sair</span>
          </div>
          <RightOutlined style={{ fontSize: 16 }}/>
        </ListItem>
      </section>


    </div>
  </>
 )
}
