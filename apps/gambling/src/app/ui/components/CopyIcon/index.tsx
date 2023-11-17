
import { notification } from "antd";
import { environment } from "apps/gambling/src/environments/environment";
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
    <button onClick={onClickToCopy}>
      {contextHolder}
      {icon ? icon : <img className={cx(`w-[14px] h-[14px] ml-1`, className)} src={`assets/${environment.assetPrefix}/icon-copy-yellow.png`} alt="" />}
    </button>
  )
}