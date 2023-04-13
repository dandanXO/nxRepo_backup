import {Page} from "../../components/layouts/Page";
import { Navigation } from "../../components/layouts/Navigation";
import { useNavigate } from "react-router";
import UserIcon from '../../components/images/UserIcon.svg';
import { useSelector } from "react-redux";
import cx from "classnames";
import Button from "../../components/Button";
import { FiChevronRight } from "react-icons/all";
import Card from "./Card";
import LinkItem from "./LinkItem";
import ListItem from "../../components/ListItem";
import { getToken } from "../../../api/base/getToken";
import { Outlet } from "react-router-dom";
import {RootState} from "../../../usecaseFlow/reduxStore";
import {PagePathEnum} from "../index";


export const PersonalInfoPage = () => {
    const navigate = useNavigate();
    const { indexPage, app } = useSelector((state: RootState) => state)
    const { user } = indexPage;

    return (
      <Page className="flex flex-col justify-between">
          <Navigation title={""} back={() => { navigate(-1) }} />

        <div className={`flex flex-row justify-center items-center pb-4`}>
          <div className={`mr-3`}><img src={UserIcon} /></div>
          <div className={`flex flex-col justify-center items-center `}>
            <div className={`font-bold`}>{user.userName}</div>
            <div
              className={cx('rounded-2xl py-1 px-4 grow text-center leading-none text-sm mt-1', {
                'border-orange-500 text-orange-500 border': user.state === 0,
                'border-emerald-500 text-emerald-500 border': user.state === 1,
              })}>
              {user.state === 0 ? 'Not Verified' : 'Verified'}
            </div>
          </div>
        </div>
        <div className={`flex flex-row justify-around items-center py-2 px-4 bg-orange-100`}>
          <div>Verify now for highest amount</div>
          <Button buttonText={<div className="flex flex-row items-center">Verify Now{<FiChevronRight className="ml-1" />}</div>} padding="py-1 px-2" />
        </div>
        <div className="m-4">
          <Card><LinkItem title={'Bank Card'} to={`/bankcard-list?token=${getToken()}`} /></Card>
          <Card>
            <LinkItem title={'Privacy Policy'} to={'/privacy-policy'} />
            <LinkItem title={'Disclosure Statement'} to={'/disclosure-statement'} />
          </Card>
          <Card>
            {app?.init?.partnership ? (<LinkItem title={'Partner'} to={'/partner'} />) : <></>}
            <LinkItem title={'Customer Service'} to={'/customer-service'} />
          </Card>
          {/* <Card><LinkItem title={'Rate Us 5 starts'} to={''} /></Card> */}
          {/* <div>Setting</div>
              <Card>
                  <ListItem title={'Privacy Policy'} text={''} />
                  <LinkItem title={'Disclosure Statement'} to={''} />
              </Card> */}
        </div>
        <div className="text-center my-2">
          <div onClick={() => navigate(`${PagePathEnum.PersonalInfoPage}/log-out-modal`)}>Log out</div>
        </div>

        <Outlet/>
      </Page>
    )
}
