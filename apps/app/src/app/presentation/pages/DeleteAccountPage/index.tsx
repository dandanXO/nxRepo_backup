import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { RootState } from '../../../reduxStore';
import { Navigation } from '../../components/layouts/Navigation';
import { Page } from '../../components/layouts/Page';
import { PagePathEnum } from '../PagePathEnum';
import { getToken } from '../../../modules/querystring/getToken';
import { Button } from '../../components/layouts/Button';

const DeleteAccountPage = () => {
    const navigate = useNavigate();
    const domain: string = useSelector((state: RootState) => state.app.androidAppInfo?.domain) || '';

    return (
        <Page className={`flex flex-col`}>
            <Navigation
                title={'Delete My Account'}
                back={() => {
                    navigate(`${PagePathEnum.PersonalInfoPage}?token=${getToken()}`);
                }}
            />
            <div className={`p-4`}>
                <div></div>
                <div className={`flex`}>
                    <div className={`mr-1.5 w-full`}>
                        <Button
                            onClick={() => {
                                //   if (isRepayTypesFetching) return;
                                navigate(`${PagePathEnum.AccountVerificationPage}?token=${getToken()}`);
                            }}
                            text={'Continue'}
                            type={'ghost'}
                        />
                    </div>
                    <div className={` ml-1.5 w-full`}>
                        <Button
                            onClick={() => {
                                navigate(`${PagePathEnum.PersonalInfoPage}?token=${getToken()}`);
                            }}
                            text={'Don’t Delete'}
                            className={`border-primary-main bg-primary-main border-[1.5px] border-solid text-white`}
                        />
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default DeleteAccountPage;
