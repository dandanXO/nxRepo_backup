
import { notification } from "antd";
import { environment } from "../../../../../environments/environment";
import cx from "classnames";
import copy from "copy-to-clipboard";
import { ReactElement } from "react";
import { CopyOutlined } from "@ant-design/icons";



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
    <>
      <button className={cx('active:opacity-50 sm:hover:opacity-50 ')} onClick={onClickToCopy}>
        {icon ? icon : <CopyOutlined className={cx(`text-base flex justify-center items-center`, className)} />}
      </button>
      {contextHolder}
    </>
  )
}
