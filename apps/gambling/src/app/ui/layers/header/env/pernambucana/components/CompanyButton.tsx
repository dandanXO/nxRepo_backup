import {environment} from "../../../../../../../environments/environment";
import React from "react";

export const CompanyButton = () => {
  return (
    <div className={"w-[276px]"} style={{ position: 'relative' }}>
      <a>
        <img alt={"logo"} src={`assets/${environment.assetPrefix}/Rectangle 88.png`} style={{
          position: 'relative',
        }}/>
        <img alt={"anotherImage"} src={`assets/${environment.assetPrefix}/Group.png`} style={{
          position: 'absolute',
          left: '0',
          top: '0'
        }}/>
        <img alt={"thirdImage"} src={`assets/${environment.assetPrefix}/Products of SKY group.png`} style={{
          position: 'absolute',
          left: '20px', /* 调整第三张图片的水平位置 */
          top: '27px' /* 调整第三张图片的垂直位置 */
        }}/>
      </a>
    </div>
  )
}
