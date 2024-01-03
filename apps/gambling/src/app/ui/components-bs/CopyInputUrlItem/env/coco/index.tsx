
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
      w-full flex rounded-xl text-[var(--text-primary)]
      justify-between bg-white`,
      className
    )}>
      {contextHolder}
      <div className={cx("", urlClassName)}>{url}</div>
      <button onClick={onClickToCopy}
        className={cx(`
        px-5
        rounded-tr-xl rounded-br-xl
        text-base text-white whitespace-nowrap
        bg-gradient-to-b from-[var(--secondary-main-from)] to-[var(--secondary-main-to)] `,
        buttonClassName)}>Cópia</button>
    </div>
  )
}
