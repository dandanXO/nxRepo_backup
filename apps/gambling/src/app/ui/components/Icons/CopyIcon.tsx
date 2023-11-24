
import { notification } from "antd";
import { environment } from "../../../../environments/environment";
import cx from "classnames";
import copy from "copy-to-clipboard";
import { ReactElement } from "react";

interface ICopyIcon {
  copyText: any;
  icon?: ReactElement;
  className?: string;
}

export const CopyIcon = (props: ICopyIcon) => {
  const { copyText, icon, className = '' } = props;
  const [api, contextHolder] = notification.useNotification();

  const onClickToCopy = () => {
    copy(copyText);
    api.success({
      message: 'Copiado!',
    });
  };
  return (
    <button className={cx('p-2 hover:rounded-full hover:bg-[rgba(255,255,255,0.7)]')} onClick={onClickToCopy}>
      {contextHolder}
      {icon ? icon : <img className={cx(`w-[24px] h-[24px]`, className)} src={`assets/${environment.assetPrefix}/icon=copy.png`} alt="" />}
    </button>
  )
}
