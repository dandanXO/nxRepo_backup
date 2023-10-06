import {AiOutlineClose} from '@react-icons/all-files/ai/AiOutlineClose';

export const CloseButton = () => {
  return (
    <button className={'absolute right-3 top-3'}>
      <AiOutlineClose size={25} />
    </button>
  );
};
