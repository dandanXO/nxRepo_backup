import React from "react";
import moment from "moment";
import style from "./style.less"
import {getAdminUser} from "../../utils";

export const WatermarkPhoto = ({ width = "300px", src = ""}) => {
  const adminUserInfo = getAdminUser();
  const collector = adminUserInfo.data.phoneNo;
  const content = `${collector}-${moment().format('YYYY-MM-DD-HH:mm:ss')}`
  return (
    <div className={style.watermark} style={{ width: width}} >
      <div className={style.watermark__inner}>
        <div className={style.watermark__body}>{content}</div>
      </div>
      <div className={style.watermark__content}>
        <img src={src}/>
      </div>
    </div>
  )
}

// <WatermarkPhoto src={"https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/id_card/panPhoto-12fe6ea2047a7d4c1e4edc836f385999.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230104T025046Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=AKIA2QV5PCTQBENATU74%2F20230104%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=1d9e2a0cf8f7f1eb398dcbfa7f7f328404142f3e2dd6dc3200cbe1fb9d17cc57"}/>
