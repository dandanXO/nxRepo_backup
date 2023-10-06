import cx from 'classnames';

interface IModal {
  children: React.ReactElement | React.ReactElement[];
  maskclassName?: string;
  className?: string;
  outlineTheme?: 'round' | undefined;
}

const Modal = (props: IModal) => {
  return (
    <div
      className={cx(
        'fixed left-0 top-0 bottom-0 z-10 flex h-full w-screen flex-col items-center justify-center bg-black bg-opacity-80 px-8 py-10',
        props.maskclassName
      )}
    >
      <div
        className={cx(
          'modal-inner bg-white-500 flex w-full flex-col bg-white p-0.5 text-center',
          {
            'rounded-3xl': props.outlineTheme === 'round',
            'rounded-lg': props.outlineTheme !== 'round',
          },
          props.className
        )}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
