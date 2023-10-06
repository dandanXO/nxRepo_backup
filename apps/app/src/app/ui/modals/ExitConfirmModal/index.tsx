import {useNavigate} from 'react-router';
import {Button} from '../../core-components/Button';
import Modal from '../../core-components/Modal';
import {RootState} from '../../../reduxStore';
import {modalSlice} from '../../../reduxStore/modalSlice';
import {useDispatch, useSelector} from 'react-redux';

import {PageOrModalPathEnum} from '../../PageOrModalPathEnum';

const ExitConfirmModal = () => {

    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { app } = useSelector((state: RootState) => state)

    const handleClose=()=>{
      dispatch(modalSlice.actions.updateExitConfirmModal({ show: false }));
    }

    const handleLeaveApp=()=>{
      navigate(`${PageOrModalPathEnum.LoginPage}`)
    }

    return (
        <Modal className='relative'>
          <div className='p-4'>
          <div className='text-base font-bold text-ctext-primary text-left'>Confirm Exit?</div>
            <div className='text-sm text-ctext-secondary my-5 text-left'>{`Are you sure you want to exit ${app.androidAppInfo?.appName}?`}</div>
            <div className='flex'>
                <Button className={`mr-1 w-full`}
                    onClick={handleClose}
                    text={'No'}
                    type={'primary'}
                />
                <Button
                    className={`ml-1 w-full`}
                    text={'Yes'}
                    onClick={handleLeaveApp}
                    type={'ghost'}
                    ghostTheme={'tertiary'}
                />
            </div>
          </div>

        </Modal>
    );
};

export default ExitConfirmModal;

