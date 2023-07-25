import Modal from '../../components/Modal';
import { CloseButton } from '../../components/layouts/CloseButton';

const UPIHintModal = (props: { onClick: () => void }) => {

    return (
        <Modal className='relative'>
            <div onClick={props.onClick}>
                <CloseButton />
            </div>
            <div className='p-6 pb-4 flex flex-col text-left text-ctext-primary text-sm '>
                <div className='mt-4'>Your UPI ID is unique and usually follows the format</div>
                <div className=''><span className='font-bold'>example@bankname</span> or</div>
                <div className='font-bold'>mobilenumber@bankname.</div>
                <div className='my-4'>
                    If you are unsure about your UPI ID, please check your bank's UPI section or contact your bank for assistance.
                </div>
            </div>
        </Modal>
    );
};

export default UPIHintModal;

