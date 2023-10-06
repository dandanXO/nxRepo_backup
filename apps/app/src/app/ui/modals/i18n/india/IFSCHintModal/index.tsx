import { CloseButton } from '../../../../core-components/CloseButton';
import Modal from '../../../../core-components/Modal';

const IFSCHintModal = (props: { onClick: () => void }) => {
  return (
    <Modal className="relative">
      <div onClick={props.onClick}>
        <CloseButton />
      </div>
      <div className="flex flex-col p-6 pb-4 text-left">
        <div className="text-ctext-primary my-4 text-sm font-bold">
          The IFSC code typically starts with 4 letters that represent the
          bank's name, followed by a 0(zero), and the remaining 6 characters
          denote the branch code. For Example: ABCD0123456.
        </div>
        <div className="text-ctext-primary mb-4 text-sm">
          Ensure that you enter the code accurately to avoid any transaction
          errors.
        </div>
      </div>
    </Modal>
  );
};

export default IFSCHintModal;
