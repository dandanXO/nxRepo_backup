import { Page } from "../../components/layouts/Page";
import CollapseItem from "./CollapseItem";
import IBan from '../../components/images/IBAN.svg';


const IBANFinderPage = () => {

    const MethodContent = ({ title, text }: { title: string, text: any }) => {
        return (
            <div className="mb-5">
                <div className="text-xs font-bold mb-1">{title}</div>
                <div className="text-xs">{text}</div>
            </div>
        )
    }

    const renderBankCardContent = () => {
        return <>
            <MethodContent title={'Method 1: '} text={'You can usually find your IBAN number by logging into your online banking, or checking your bank statement.'} />
            <MethodContent title={'Method 2: Online Search'} text={<a className="text-blue-500" href="https://wise.com/gb/iban/calculator">https://wise.com/gb/iban/calculator</a>} />
        </>
    }
    const renderEasypaisaContent = () => {
        return <>
            <div className="mb-5 text-xs">Here is how to get the IBAN Number of your Easypaisa account.</div>
            <MethodContent title={'Method 1: How to Get Easypaisa IBAN Number Using App'}
                text={
                    <div>
                        <div>If you have the Easypaisa app on your smartphone then follow these instructions.</div>
                        <div>1. Firstly, open theEasypaisa appand Sign In to your Easypaisa account.</div>
                        <div>2. Next, you need to tap on the "My Account" option located in the bottom right corner of the screen.</div>
                        <div>3. Here, you need to select "Account Information."</div>
                        <div>4. On the new screen, you will see the Easypaisa IBAN Number of your account.</div>
                        <div className="flex justify-center m-4 mb-8"><img className="w-2/3" src={IBan} /></div>
                        <div>This way you can easily get the IBAN Number of your Easypaisa account. Now, you can receive funds from across the world using the IBAN Number of your Easypaisa account.</div>
                    </div>
                } />
            <MethodContent title={'Method 2: Easypaisa IBAN Number Generator Without App'}
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
                } />
        </>

    }

    const renderJazzCashContent = () => {
        return <>
            <div className="mb-5 text-xs">Here is how to find the JazzCash IBAN Number of your account.</div>
            <MethodContent title={'Method 1: Using JazzCash App'}
                text={
                    <div>
                        <div>You can find the IBAN Number of the JazzCash account by following these steps.</div>
                        <div>1. Open the JazzCash app on your smartphone and Select "My Account".</div>
                        <div>2. Select "RAAST ID Managemen".</div>
                        <div>3. In the new window, you will see the JazzCash IBAN Number.</div>
                    </div>
                } />
            <MethodContent title={'Method 2: Using JazzCash Helpline'}
                text={
                    <div>
                        If you don’t have the android app then you can simply make a call at JazzCash helpline.
                        Dial 4444 from your Jazz number or 021-111-124-444 from any other number and ask the
                        JazzCash agent for the IBAN Number. Sometimes they may ask for your account verification
                        and they will inform you of the IBAN Number of the JazzCash account.
                    </div>
                } />
        </>

    }

    return (
        <Page className="flex flex-col m-5">
            <CollapseItem title={'How to Get Bank Card IBAN Number?'} content={renderBankCardContent()} isCollapse={false}/>
            <CollapseItem title={'How to Get Easypaisa IBAN Number?'} content={renderEasypaisaContent()} isCollapse={false}/>
            <CollapseItem title={'How to Get JazzCash IBAN Number?'} content={renderJazzCashContent()} isCollapse={false}/>
        </Page>
    )
}

export default IBANFinderPage;
