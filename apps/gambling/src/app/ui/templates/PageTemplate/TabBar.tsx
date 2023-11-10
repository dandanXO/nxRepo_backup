import cx from "classnames";
import {useLocation, useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";
import {appSlice} from "../../../reduxStore/appSlice";
import { environment } from "../../../../environments/environment";

export type IFooter = {

}
export const TabBar = (props: IFooter) => {
  const location = useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLogin, isShowLoginModal} = useSelector((state: RootState) => state.app)

  return (
    <footer className={"fixed bottom-0 flex flex-row justify-between h-[60px] z-10 bg-[#013E42] w-full p-2"}>
      <section className={"flex-1 flex flex-col items-center"}
               onClick={() => {
                 navigate(PageOrModalPathEnum.IndexPage);
               }}
      >
        {(
          location.pathname === PageOrModalPathEnum.IndexPage ||
          location.pathname === PageOrModalPathEnum.GameSearchPage
        ) ? (
          <img className="w-[27px] h-[27px]" src={`assets/${environment.assetPrefix}/ic_home_h5.png`}/>
        ): (
          <img className="w-[27px] h-[27px]" src={`assets/${environment.assetPrefix}/ic_home_inactive.png`}/>
        )}
        <span className={cx("text-sm text-[#2CFD99]", {
          "text-[#E5F041]": location.pathname === PageOrModalPathEnum.IndexPage,
        })}>Jogos</span>
      </section>

      <section className={"flex-1 flex flex-col items-center"}
               onClick={() => {
                 navigate(PageOrModalPathEnum.IndexSlotPage);
               }}
      >
        {location.pathname === PageOrModalPathEnum.IndexSlotPage  ? (
          <img className="w-[27px] h-[27px]" src={`assets/${environment.assetPrefix}/ic_game_h5.png`}/>
        ): (
          <img className="w-[27px] h-[27px]" src={`assets/${environment.assetPrefix}/ic_game_inactive.png`}/>
        )}
        <span className={cx("text-sm text-[#2CFD99]", {
          "text-[#E5F041]": location.pathname === PageOrModalPathEnum.IndexSlotPage,
        })}>Casino</span>
      </section>

      <section className={"flex-1 flex flex-col items-center"}
               onClick={() => {
                 if(!isLogin) {
                   dispatch(appSlice.actions.showLoginDrawerOrModal(true))
                 } else {
                   navigate(PageOrModalPathEnum.InvitePage);
                 }
               }}
      >
        {location.pathname === PageOrModalPathEnum.InvitePage  ? (
          <img className="w-[27px] h-[27px]" src={`assets/${environment.assetPrefix}/ic_invite_friends_h5.png`}/>
        ): (
          <img className="w-[27px] h-[27px]" src={`assets/${environment.assetPrefix}/ic_invite_friends_inactive.png`}/>
        )}
        <span className={cx("text-sm text-[#2CFD99]", {
          "text-[#E5F041]": location.pathname === PageOrModalPathEnum.InvitePage,
        })}>Convidar</span>
      </section>

        <section className={"flex-1 flex flex-col items-center"}
                 onClick={() => {
                     if(!isLogin) {
                         dispatch(appSlice.actions.showLoginDrawerOrModal(true))
                     } else {
                         navigate(PageOrModalPathEnum.VIPGradePage);
                     }
                 }}
        >
            {location.pathname === PageOrModalPathEnum.VIPGradePage  ? (
                <img className="w-[27px] h-[27px]" src={`assets/${environment.assetPrefix}/ic_vip_h5.png`}/>
            ): (
                <img className="w-[27px] h-[27px]" src={`assets/${environment.assetPrefix}/ic_vip_inactive.png`}/>
            )}
            <span className={cx("text-sm text-[#2CFD99]", {
                "text-[#E5F041]": location.pathname === PageOrModalPathEnum.VIPGradePage,
            })}>VIP</span>
        </section>


        <section className={"flex-1 flex flex-col items-center"}
               onClick={() => {
                 if(!isLogin) {
                   dispatch(appSlice.actions.showLoginDrawerOrModal(true))
                 } else {
                   navigate(PageOrModalPathEnum.MyPage);
                 }
               }}
      >
        {location.pathname === PageOrModalPathEnum.MyPage  ? (
          <img className="w-[27px] h-[27px]" src={`assets/${environment.assetPrefix}/ic_account_h5.png`}/>
        ): (
          <img className="w-[27px] h-[27px]" src={`assets/${environment.assetPrefix}/ic_account_inactive.png`}/>
        )}
        <span className={cx("text-sm text-[#2CFD99]", {
          "text-[#E5F041]": location.pathname === PageOrModalPathEnum.MyPage,
        })}>Minha</span>
      </section>

    </footer>
  )
}
