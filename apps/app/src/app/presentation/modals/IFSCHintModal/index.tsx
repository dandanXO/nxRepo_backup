
import Modal from '../../components/Modal';
import { CloseButton } from '../../components/layouts/CloseButton';


const IFSCHintModal = (props:{onClick:()=>void}) => {

    return (
        <Modal className='relative'>
            <div onClick={props.onClick}>
                <CloseButton />
            </div>
            <div className='p-6 pb-4 flex flex-col text-left'>
                <div className='text-sm font-bold text-ctext-primary my-4'>
                    The IFSC code typically starts with 4 letters that represent the bank's name, followed by a 0(zero), 
                    and the remaining 6 characters denote the branch code. For Example: ABCD0123456.
                </div>
                <div className='text-sm text-ctext-primary mb-4'>Ensure that you enter the code accurately to avoid any transaction errors.</div>
            </div>
        </Modal>
    );
};

export default IFSCHintModal;

