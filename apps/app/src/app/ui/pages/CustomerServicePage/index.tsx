import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { RootState } from '../../../reduxStore';
import { Button } from '../../core-components/Button';
import { Navigation } from '../../core-components/Navigation';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { getToken } from '../../../application/getToken';
import CustomServiceIcon from './CustomServiceIcon'
import { Horizontal } from '../../core-components/Horizontal';
import { USER_AUTH_STATE } from '../../../domain/user/USER_AUTH_STATE';
import {useMailToRUL} from "../../hooks/useMailToRUL";
import {isShowNavigation} from "../../../device/isShowNavigation";

const CustomerServicePage = () => {
    const navigate = useNavigate();
    const { app, indexPage } = useSelector((state: RootState) => state);
    const mailContentName = indexPage.user.state === USER_AUTH_STATE.ready ? 'guest' : indexPage?.user?.bankCardName || '';
    const {mailToURL} = useMailToRUL(mailContentName);

    return (
        <div className='flex flex-col w-screen h-full'>
            <div className={`h-2/5 w-full bg-gradient-to-br from-primary-assistant  to-primary-main rounded-b-[50px] flex flex-col `}>
                {isShowNavigation() && (
                    <Navigation
                        className='bg-transparent top-0 left-0 w-full'
                        title={'Customer Service'}
                        back={() => {
                            navigate(`${PageOrModalPathEnum.PersonalInfoPage}?token=${getToken()}`);
                        }}
                    />)}
                <div className='flex justify-center grow items-center'>
                    <CustomServiceIcon />
                </div>
            </div>
            <div className="w-full mt-[-16px] grow">
                <div className="p-6 mx-6 mt-[-16px] rounded-md shadow-[0_0px_8px_rgba(0,0,0,0.1)] bg-cbg-secondary h-full">
                    <div className='flex justify-between text-sm'>
                        <div>
                            <div className='font-bold text-primary-main grow'>{'Contact by Mail'}</div>
                            <div>{app?.init?.csEmail || ''}</div>
                        </div>
                        <a href={mailToURL}
                            className='self-center'>
                            <Button className={'py-1 px-5'} text={'Go'} />
                        </a>
                    </div>
                    <div className='my-5'><Horizontal /></div>
                    {indexPage.user.state !== USER_AUTH_STATE.ready && indexPage.user.state !== USER_AUTH_STATE.authing &&
                        indexPage.indexAPI?.customerServiceUrl && indexPage.indexAPI?.customerServiceUrl !== "" &&
                        (<>
                            <div className='flex justify-between text-sm '>
                                <div>
                                    <div className='font-bold text-primary-main grow'>{'Online Customer Service'}</div>
                                    <div>{app?.init?.csServiceTime || ''}</div>
                                </div>
                                <div className='self-center'>
                                    <Button text={'Go'} className='w-auto py-1 px-5'
                                        onClick={() => {
                                            navigate(`/v2/online-customer-service?token=${getToken()}`);
                                        }}/>
                                </div>
                            </div>
                            <div className='my-5'><Horizontal /></div>
                        </>
                        )
                    }
                    <div className='flex justify-between text-sm '>
                        <div>
                            <div className='font-bold text-primary-main grow'>{'Feedback'}</div>
                            <div>{app?.init?.csServiceTime || ''}</div>
                        </div>
                        <div className='self-center'>
                            <Button text={'Go'} className='w-auto py-1 px-5'
                                onClick={() => {
                                    navigate(`${PageOrModalPathEnum.FeedbackPage}?token=${getToken()}`);
                                }} />
                        </div>
                    </div>
                    {app?.init?.csContactNumber?.trim() && (
                      <>
                        <div className='my-5'><Horizontal /></div>
                        <div className='flex justify-between text-sm '>
                          <div>
                            <div className='font-bold text-primary-main grow'>{'Phone'}</div>
                            <div>{app?.init?.csContactNumber || ''}</div>
                            <div>{app?.init?.csServiceTime || ''}</div>
                          </div>
                          <a href={`tel:${app?.init?.csContactNumber || ''}`} className='self-center'>
                            <Button className={'py-1 px-5'} text={'Go'} />
                          </a>
                        </div>
                      </>
                    )}
                    {app?.init?.csWhatsApp?.trim() && (
                      <>
                        <div className='my-5'><Horizontal /></div>
                        <div className='flex justify-between text-sm '>
                          <div>
                            <div className='font-bold text-primary-main grow'>{'Whatsapp'}</div>
                            <div>{app?.init?.csWhatsApp || ''}</div>
                            <div>{app?.init?.csServiceTime || ''}</div>
                          </div>
                        </div>
                      </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default CustomerServicePage;
