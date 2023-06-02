
import cx from 'classnames';

interface IModal {
    children: React.ReactElement[];
    className?: string;
}

const Modal = (props: IModal) => {

    return (
        <div className={'sticky top-0 bottom-0 z-10 flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-80 px-8 py-10'}>
            <div className={cx('modal-inner w-full rounded-lg bg-white p-0.5 text-center bg-white-500 flex flex-col', props.className)}>
                {props.children}
            </div>
        </div>
    )
}

export default Modal;

