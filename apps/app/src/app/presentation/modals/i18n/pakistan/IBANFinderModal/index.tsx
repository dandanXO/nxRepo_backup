import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Overlay } from '@frontend/mobile/shared/ui';

import Divider from '../../../../components/Divider';
import IBan from '../../../../components/images/IBAN.svg';

const IBANFinderModal = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const MethodContent = ({ title, text }: { title: string; text: any }) => {
    return (
      <div className="mb-4">
        <div className="text-sm font-bold">{title}</div>
        <div className="text-sm">{text}</div>
      </div>
    );
  };

  const TopicContent = ({ title, text }: { title: string; text: any }) => {
    return (
      <div>
        <div className="text-sm font-bold">{title}</div>
        <div className="my-4 text-sm">{text}</div>
      </div>
    );
  };

  const renderByBank = () => {
    return (
      <div className="p-5 text-left text-black">
        <div className="text-sm font-bold">How to Get Bank Card IBAN Number?</div>
        <Divider />
        <div className="mt-3 bg-[#F6F6F6] p-3">
          <MethodContent
            title={'Method 1: '}
            text={
              'You can usually find your IBAN number by logging into your online banking, or checking your bank statement.'
            }
          />
          <MethodContent
            title={'Method 2: Online Search'}
            text={
              <a className="text-blue-500" href="https://wise.com/gb/iban/calculator">
                https://wise.com/gb/iban/calculator
              </a>
            }
          />
        </div>
      </div>
    );
  };

  const renderByWallet = () => {
    return (
      <div className="p-5 text-left text-black">
        <div className="text-sm font-bold">How to Get Easypaisa and JazzCash IBAN Number?</div>
        <Divider />
        <div className="mt-3 bg-[#F6F6F6] p-3 ">
          <TopicContent
            title={'How to Get Easypaisa IBAN Number'}
            text={'Here is how to get the IBAN Number of your Easypaisa account.'}
          />
          <MethodContent
            title={'Method 1: How to Get Easypaisa IBAN Number Using App'}
            text={
              <div>
                <div>If you have the Easypaisa app on your smartphone then follow these instructions.</div>
                <div>1. Firstly, open theEasypaisa appand Sign In to your Easypaisa account.</div>
                <div>
                  2. Next, you need to tap on the "My Account" option located in the bottom right corner of the screen.
                </div>
                <div>3. Here, you need to select "Account Information."</div>
                <div>4. On the new screen, you will see the Easypaisa IBAN Number of your account.</div>
                <div className="my-2">
                  <img className="" src={IBan} />
                </div>
                <div>
                  This way you can easily get the IBAN Number of your Easypaisa account. Now, you can receive funds from
                  across the world using the IBAN Number of your Easypaisa account.
                </div>
              </div>
            }
          />
          <MethodContent
            title={'Method 2: Easypaisa IBAN Number Generator Without App'}
            text={
              <div>
                <div>You can generate Easypaisa Account Number without an app using the simple steps below.</div>
                <div>1. Dial *786# from your phone dialer.</div>
                <div>2. Here, select "My Account" and tap on the Send button.</div>
                <div>3. Next, select "View Account Details" and tap on Send button.</div>
                <div>4. In the next menu, choose "Fetch IBAN".</div>
                <div>5. Then, enter 5 digit PIN of your Easypaisa account.</div>
                <div>6. Now, the Easypaisa IBAN Number will display on your mobile phone screen.</div>
              </div>
            }
          />
          <div className="my-10 border border-dashed border-black"></div>
          <TopicContent
            title={'How to Get JazzCash IBAN Number?'}
            text={'Here is how to find the JazzCash IBAN Number of your account.'}
          />
          <MethodContent
            title={'Method 1: Using JazzCash App'}
            text={
              <div>
                <div>You can find the IBAN Number of the JazzCash account by following these steps.</div>
                <div>1. Open the JazzCash app on your smartphone and Select "My Account".</div>
                <div>2. Select "RAAST ID Managemen".</div>
                <div>3. In the new window, you will see the JazzCash IBAN Number.</div>
              </div>
            }
          />
          <MethodContent
            title={'Method 2: Using JazzCash Helpline'}
            text={
              <div>
                If you don’t have the android app then you can simply make a call at JazzCash helpline. Dial 4444 from
                your Jazz number or 021-111-124-444 from any other number and ask the JazzCash agent for the IBAN
                Number. Sometimes they may ask for your account verification and they will inform you of the IBAN Number
                of the JazzCash account.
              </div>
            }
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Overlay
        contentNoStyle={true}
        show={true}
        title="Tips"
        enableClose={true}
        onCancel={() => navigate(-1)}
        enableTitleHorizontal={true}
        content={(hide: () => void) => {
          return (
            <div className={`h-screen `}>
              <div className="mb-3 text-xl font-bold ">Tips</div>
              <Divider />
              {location.state === 'Bank' ? renderByBank() : renderByWallet()}
            </div>
          );
        }}
        // enableTitleHorizontal={true}
      ></Overlay>
    </div>
  );
};

export default IBANFinderModal;
