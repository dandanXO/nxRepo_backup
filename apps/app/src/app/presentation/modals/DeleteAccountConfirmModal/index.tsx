import { useLocation, useNavigate } from 'react-router';
import { Button } from '../../components/layouts/Button';
import Modal from '../../components/Modal';

const DeleteAccountConfirmModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const dispatch = useDispatch();
    // const modalState = useSelector((state: RootState) => state.model)

    return (
        <Modal>
           <div>DeleteAccountConfirmModal</div>
        </Modal>
    );
};

export default DeleteAccountConfirmModal;
