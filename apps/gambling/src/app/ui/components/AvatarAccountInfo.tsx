import {AppLocalStorage} from "../../persistant/localstorage";
import {useSelector} from "react-redux";
import {RootState} from "../../reduxStore";
import {useNavigate} from "react-router";
import cx from "classnames";
import {environment} from "../../../environments/environment";
import {PageOrModalPathEnum} from "../PageOrModalPathEnum";
import React from "react";
import styled from "styled-components";
import {IUserInfo} from "../../persistant/IUserInfo";
import {AppLocalStorageKey} from "../../persistant/AppLocalStorageKey";

const VIPLabel = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  //box-shadow: inset 0 0 36px 5px rgba(255, 219, 0, 0.09);
  border-radius: 10px;
  border: none; /* 取消边框 */
  color: #ffffff;
  margin-top: 6px;
  //float: right;
  font-weight: bold;
  background: url("assets/${environment.uVersion}/account_vip.png") no-repeat 3px center/70%;
`

export type IAvatarAccountInfo = {
  className?: string;
}

export const AvatarAccountInfo = (props: IAvatarAccountInfo) => {
  const user: IUserInfo = AppLocalStorage.getItem(AppLocalStorageKey.userInfo) ? JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || "") : {};
  // const vip_level = useSelector((state: RootState) => state.app?.userStore?.userinfo?.vip_level)
  const vip_level = useSelector((state: RootState) => state.app?.vip_level)
  const navigate = useNavigate();

  const imageStyles = {
    marginLeft: '3px', /* 可以根据需要调整间距 */
    marginTop: '1px'
  };

  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'left', // 使用 "left" 代替字符串
  };

  const contentStyles = {
    display: 'flex',
    alignItems: 'center',
  };


  return (
    <section className={cx("flex flex-col items-start text-base", props.className)}>
      <span className={"flex flex-row"}>
        <span className={"text-white mr-2"}>ID:{user.user_id}</span>
        <button>
          <img className="w-[22px] h-[20px]" alt={"copy"} src={`assets/${environment.uVersion}/ic_copy.png`}/>
        </button>
      </span>
      <div style={contentStyles}>
        <VIPLabel className="" onClick={() => navigate(PageOrModalPathEnum.VIPGradePage)}>
          <span className={'mr-6'}>VIP. {vip_level}</span>
          {/*<img src={"assets/001/Seta.png"} alt="箭头" width="35px" height="50px" style={imageStyles} />*/}
        </VIPLabel>
        {/*<RightOutlined className="mt-1 mr-8" style={{ fontSize: 25, color: 'white', fontWeight: 1000 }} onClick={() => navigate(PageOrModalPathEnum.VIPGradePage)}/>*/}
      </div>


    </section>
  )
}
