import styled from "styled-components";
import cx from "classnames";
import React, {useState} from "react";
import {UserMoneyStatusSection} from "../../UserMoneyStatusSection";
import { useDispatch, useSelector } from "react-redux";
import {RootState} from "../../../../../reduxStore";
import {LoginButton} from "../../../../components-bs/Buttons/LoginButton";
import {HeaderMenu} from "./components/HeaderMenu";
import {CocoAvatar} from "../../../../components/Avatar/CocoAvatar";
import {AppLocalStorage} from "../../../../../persistant/localstorage";
import {usePageNavigate} from "../../../../router/hooks/usePageNavigate";
import {IUserInfo} from "../../../../../persistant/IUserInfo";
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";
import {NotificationAnimationIcon} from "../../../../components-bs/Icons/animation/NotificationAnimationIcon";
import {MenuLogo} from "../../../../components-bs/Logos/env/u1/MenuLogo";
import {IHeader} from "../../types/IHeader";
import { uiSlice } from "../../../../../reduxStore/uiSlice";
import {debounce} from "lodash";

const DirectionIcon = styled.img<{
  active?: boolean
}>`
  height: 8px;
  width: 12px;
  transform: rotate(${props => props.active ? 180 : 0}deg);
`

const HeaderButton = styled.button.attrs((props) => ({
  className: cx("", props.className),
})) <{
  className?: string;
}>`
  width: 100%;
  background-color: var(--primary-varient);
  color: var(--white);
  transform: skew(-8deg);
  font-size: 16px;
  &:hover {
   color:var(--secondary-main-to);
   border-bottom: 3px solid var(--secondary-main-to);
  }
`

const HeaderButtonText = styled.div`
  transform: skew(8deg);
  /* height: 100%; */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Header = (props: IHeader) => {
  const user: IUserInfo = AppLocalStorage.getItem(AppLocalStorageKey.userInfo) ? JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || "") : {};

  const { isLogin, messageCount } = useSelector((state: RootState) => state.app);
  const { openUserInfoStatusPopover } = useSelector((state: RootState) => state.ui);

  const [hover, setHover] = useState(false);
  const { onClickToIndex, onClickToInvite, onClickToVipGrade } = usePageNavigate();

  const dispatch = useDispatch();


  return (
    <header
      className={cx("z-[1001] sticky top-[0] h-[66px] max-h-[66px]",
        "flex flex-row justify-between items-center relative bg-[var(--primary-variant)] ",
        // "bg-purple-500"
      )}
    // style={{
    //   backgroundImage: `url("assets/${environment.assetPrefix}/top_di.png")`, // 替换成背景图片路径
    //   backgroundSize: 'cover', // 调整背景图片大小以填充整个元素
    //   backgroundPosition: '90% 50%', // 调整背景图片位置
    //   backgroundRepeat: 'no-repeat', // 禁止背景图片重复
    //   backgroundColor: '#013E42', // 设置背景颜色
    // }}
    >

      <div className='flex'>
        {
          hover &&
          (
            <div
              onMouseOver={() => { setHover(true) }}
              onMouseOut={() => { setHover(false) }}
            >
              <HeaderMenu />
            </div>
          )
        }

        <div className={"flex  flex-row min-w-[738px] max-h-[67px] -mb-[1px]"}
          onMouseOver={() => {
            setHover(true);
          }}
          onMouseOut={() => {
            setHover(false)
          }}
        >
          <div
            className={"-mr-1 cursor-pointer flex row justify-center items-center"}
            onClick={() => onClickToIndex()}
          >
            <MenuLogo/>
          </div>

          <HeaderButton>
            <HeaderButtonText onClick={onClickToIndex}>Jogos</HeaderButtonText>
          </HeaderButton>
          <HeaderButton>
            <HeaderButtonText>Atividade</HeaderButtonText>
          </HeaderButton>
          <HeaderButton>
            <HeaderButtonText onClick={onClickToInvite}>Convidar</HeaderButtonText>
          </HeaderButton>
          <HeaderButton>
            <HeaderButtonText onClick={onClickToVipGrade}>VIP</HeaderButtonText>
          </HeaderButton>
          <HeaderButton>
            <HeaderButtonText onClick={props.onClickToDownload}>Download</HeaderButtonText>
          </HeaderButton>
        </div>
      </div>


      {!isLogin && (
        <div className="flex-1 flex justify-end mr-4">
          <LoginButton
            className={"text-white text-lg"}
            onClick={() => {
              props.onClickUserLoginStatusDrawer()
            }}
          >Conecte-se</LoginButton>
        </div>
      )}


      {/*[How to Align Last Flex Item to Right](https://medium.com/@iamryanyu/how-to-align-last-flex-item-to-right-73512e4e5912)*/}
      {isLogin && (
        <section className={"flex flex-row items-center gap-6 mr-6 oo"}>

          <div className={"hidden lg:block"}>
            <UserMoneyStatusSection />
          </div>

          <section
            className='flex gap-2 items-center'
            onClick={() => dispatch(uiSlice.actions.setUserInfoStatusPopover(!openUserInfoStatusPopover))}
            onMouseOver={debounce(()=>{
              if(openUserInfoStatusPopover) return
              return dispatch(uiSlice.actions.setUserInfoStatusPopover(!openUserInfoStatusPopover))
            }, 10)}
            onMouseOut={() => {
              // console.log("onMouseOut")
            }}
            onMouseLeave={() => {
              // console.log("onMouseLeave")
              // NOTICE: StatusPopover 不能有 mash div 佔滿全部螢幕，不然會導致 over out leave 瞬間連續觸發
              // props.onClickToPopupUserInfoStatusPopover();
            }}
          >
            <CocoAvatar className='w-[44px] h-[44px]' />
            <div>
              <div className='text-lg text-white flex gap-2'>
                <div>{user.nickname}</div>
                <DirectionIcon
                  active={openUserInfoStatusPopover}
                  className='mx-auto my-auto'
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAMAAAA/D5+aAAAATlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////+QlxstAAAAGnRSTlMAmWYJlZFeE4yBcU0xIRCJfGxZR0Q4LCYcBOMgs9gAAABiSURBVBjTjc9HDoAgAETRURCUZm/3v6iKhtA0vu1fTAafZJlixiZRpCpuE2mSQlfceB2n2a3pKiwScFRQGHyTV8SOwOBKQxDpn1JzxEhnC9VImfZKCjnbeWFE3kIZ3hD8dAA6kgJgxoBGKwAAAABJRU5ErkJggg=='
                />
              </div>
              <div className='text-base text-[var(--text-tertiary)] leading-none'>ID:{user.user_id}</div>
            </div>
          </section>

          <section className={"relative flex justify-center"}>
            <div
              onClick={() => {
                props.onClickToOpenNotificationDrawer();
              }}
            >
              <NotificationAnimationIcon messageCount={messageCount}/>
            </div>
          </section>

        </section>
      )}

    </header>
  )
}
