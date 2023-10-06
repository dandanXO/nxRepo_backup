import { useNavigate } from 'react-router';

import { getToken } from '../../../application/getToken';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { Button } from '../../core-components/Button';
import { Navigation } from '../../core-components/Navigation';
import { Page } from '../../core-components/Page';

const DeleteAccountPage = () => {
  const navigate = useNavigate();
  return (
    <Page className={`flex flex-col`}>
      <Navigation
        title={'Delete My Account'}
        back={() => {
          navigate(
            `${PageOrModalPathEnum.PersonalInfoPage}?token=${getToken()}`
          );
        }}
      />
      <div className={`flex grow flex-col p-4 pt-0`}>
        <div className="grow">
          <div className="text-ctext-primary mb-4 text-base font-bold">
            Before deleting your account, please read the following carefully:
          </div>
          <div className={`text-ctext-secondary text-xs`}>
            <ul className="list-outside list-decimal pl-3">
              <li>
                Deleting your account is a permanent action and cannot be
                undone. All of your data, including loan history, repayment
                schedules, and personal information, will be lost.
              </li>
              <li>
                Deleting your account will not cancel any outstanding loans or
                affect your repayment obligations. You will still be responsible
                for repaying any outstanding balances.
              </li>
              <li>
                If you have any outstanding loans, please ensure that they are
                fully repaid before deleting your account.
              </li>
              <li>
                After successfully deleting the account, the APP will continue
                to retain transaction data for financial auditing purposes.
              </li>
              <li>
                After the account is deleted, the personal identification
                information associated with the account will take 7 business
                days to be fully removed.
              </li>
              <li>
                By continuing, you acknowledge that you have read and understand
                the above information, and that you are fully responsible for
                any consequences that may result from deleting your account,
                including the continued repayment of any outstanding loans.
              </li>
              <li>
                If you have any concerns or issues with your account or loans,
                please contact our customer support team before deleting your
                account.
              </li>
            </ul>
          </div>
        </div>
        <div className={`flex`}>
          <div className={`mr-1.5 w-full`}>
            <Button
              onClick={() => {
                navigate(
                  `${
                    PageOrModalPathEnum.AccountVerificationPage
                  }?token=${getToken()}`
                );
              }}
              text={'Continue'}
              type={'ghost'}
            />
          </div>
          <div className={` ml-1.5 w-full`}>
            <Button
              onClick={() => {
                navigate(
                  `${PageOrModalPathEnum.PersonalInfoPage}?token=${getToken()}`
                );
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
