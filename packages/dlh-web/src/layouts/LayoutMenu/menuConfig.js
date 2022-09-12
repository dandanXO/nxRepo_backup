import { indexStatisticsMenuList } from '../../pages/indexStatistics';
import { userManageMenuList} from '../../pages/userManage';
import { iCloudAccountManageMenuList } from '../../pages/icloudAccountManage';
import { windControlCheckMenuList } from '../../pages/windControlCheck'
import { channelManageMenuList } from '../../pages/channelManage';
import { recycleManageMenuList } from '../../pages/recycleManage';
import { paramsManageMenuList } from '../../pages/paramsManage';
import { loanManageMenuList } from '../../pages/loanManage';
import { afterLoanManageMenuList } from '../../pages/afterLoanManage';
import { systemManageMenuList } from '../../pages/systemManage';
import { h5ManageMenuList } from '../../pages/h5Manage';
import { businessStatisticsMenuList } from '../../pages/businessStatistics';
import { operatorManageMenuList } from '../../pages/operatorManage';
import { paymentMangeMenuList } from '../../pages/paymentManage';
import { riskFeeMangeMenuList } from '../../pages/riskFeeManage';

const list = [].concat(
    {
        title: '首页',
        key: '/index',
        icon: 'home'
    },
    userManageMenuList,
    iCloudAccountManageMenuList,
    windControlCheckMenuList,
    channelManageMenuList,
    recycleManageMenuList,
    // paramsManageMenuList,
    // loanManageMenuList,
    afterLoanManageMenuList,
    h5ManageMenuList,
    businessStatisticsMenuList,
    operatorManageMenuList,
    systemManageMenuList,
    paymentMangeMenuList,
    riskFeeMangeMenuList
);
console.log(list);
export default list;