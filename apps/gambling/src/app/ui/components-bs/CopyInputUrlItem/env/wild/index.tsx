
import { notification } from "antd";
import cx from "classnames";
import copy from "copy-to-clipboard";

interface ICopyInputUrlItem {
  url: string;
  className?: string;
  urlClassName?: string;
  buttonClassName?: string;
}

export const CopyInputUrlItem = (props: ICopyInputUrlItem) => {
  const { url, className = '', urlClassName, buttonClassName } = props;
  const [api, contextHolder] = notification.useNotification();

  const onClickToCopy = () => {
    copy(url);
    api.success({
      message: 'Copiado!',
    });
  };
  return (
    <div className={cx(`
      w-full flex rounded-3xl text-white
      justify-between bg-gradient-to-b from-[#7e2e83] from-0% to-[#310081] to-100% 
      shadow-md bg-white bg-opacity-10 inset-x-0 bottom-0 `,
      className
    )}>
      {contextHolder}
      <div className={cx("p-4", urlClassName)}>{url}</div>
      <button onClick={onClickToCopy} className={cx('rounded-3xl bg-gradient-to-l from-[#E61D62] to-[#FF570F] px-4 whitespace-nowrap', buttonClassName)}>Cópia</button>
    </div>
  )
}