export const processRoutesForNewCMS = (data) => {
  return data.map((menuItem) => {
    // APP 配置
    if (menuItem.actionUrl === '/appSetting') {
      menuItem.children &&
        menuItem.children.map((level2MenuItem) => {
          // APP 配置
          if (level2MenuItem.actionUrl === '/appSettingManage') {
            level2MenuItem.actionUrl = '/cms/appSetting/appSettingManage';
          }
        });
    }
    // 用戶管理
    if (menuItem.actionUrl === '/userManage') {
      menuItem.children &&
        menuItem.children.map((level2MenuItem) => {
          // 用戶管理
          if (level2MenuItem.actionUrl === '/userInfoManage') {
            level2MenuItem.actionUrl = '/cms/userManage/userInfoManage';
          }
          // 用戶終審
          if (level2MenuItem.actionUrl === '/userLastCheck') {
            level2MenuItem.actionUrl = '/cms/userManage/userLastCheck';
          }
          // 用戶審核紀錄
          if (level2MenuItem.actionUrl === '/userCheckRecord') {
            level2MenuItem.actionUrl = '/cms/userManage/userCheckRecord';
          }
          // 黑名單
          if (level2MenuItem.actionUrl === '/blackListManage') {
            level2MenuItem.actionUrl = '/cms/userManage/blackListManage';
          }
          // 白名單
          if (level2MenuItem.actionUrl === '/whiteListManage') {
            level2MenuItem.actionUrl = '/cms/userManage/whiteListManage';
          }
        });
    }
    // 渠道管理
    if (menuItem.actionUrl === '/channelManage') {
      menuItem.children &&
        menuItem.children.map((level2MenuItem) => {
          if (level2MenuItem.actionUrl === '/channelList') {
            level2MenuItem.actionUrl = '/cms/channelManage/channelList';
          }
        });
    }

    if (menuItem.actionUrl === '/platform-manage') {
      menuItem.children &&
        menuItem.children.map((level2MenuItem) => {
          if (level2MenuItem.actionUrl === '/merchant-manage') {
            // 商戶管理
            level2MenuItem.actionUrl = '/cms/platform-manage/merchant-manage';
          } else if (level2MenuItem.actionUrl === '/product-manage') {
            // 產品管理
            level2MenuItem.actionUrl = '/cms/platform-manage/product-manage';
          }
        });
    }
    if (menuItem.actionUrl === '/riskConfigManage') {
      menuItem.children &&
        menuItem.children.map((level2MenuItem) => {
          if (level2MenuItem.actionUrl === '/risk-model-setting') {
            level2MenuItem.actionUrl =
              '/cms/riskConfigManage/risk-model-setting';
          }
        });
    }

    if (menuItem.actionUrl === '/orderManagement') {
      menuItem.children &&
        menuItem.children.map((level2MenuItem) => {
          // 訂單列表
          if (level2MenuItem.actionUrl === '/orderList') {
            level2MenuItem.actionUrl = '/cms/orderManagement/orderList';
          }
          // 订单复审
          if (level2MenuItem.actionUrl === '/businessRepeatCheck') {
            level2MenuItem.actionUrl =
              '/cms/orderManagement/businessRepeatCheck';
          }
          // 訂單終審
          if (level2MenuItem.actionUrl === '/businessLastCheck') {
            level2MenuItem.actionUrl = '/cms/orderManagement/businessLastCheck';
          }

          // 订单审核纪录
          if (level2MenuItem.actionUrl === '/checkRecord') {
            level2MenuItem.actionUrl = '/cms/orderManagement/checkRecord';
          }
        });
    }
    if (menuItem.actionUrl === '/h5Manage') {
      menuItem.children &&
        menuItem.children.map((level2MenuItem) => {
          // 廣告管理
          if (level2MenuItem.actionUrl === '/activity-setting') {
            level2MenuItem.actionUrl = '/cms/h5Manage/activity-setting';
          }
        });
    }

    // 電銷管理
    if (menuItem.actionUrl === '/tel-sale') {
      menuItem.children &&
        menuItem.children.map((level2MenuItem) => {
          // 電銷團隊管理
          if (level2MenuItem.actionUrl === '/tel-team-manage') {
            level2MenuItem.actionUrl = '/cms/telSaleManage/telSaleMemberManage';
          }
        });
    }

    // 财务管理
    if (menuItem.actionUrl === '/paymentManage') {
      menuItem.children &&
        menuItem.children.map((level2MenuItem) => {
          // 还款补单
          if (level2MenuItem.actionUrl === '/pay-receipt') {
            level2MenuItem.actionUrl = '/cms/paymentManage/pay-receipt';
          }
        });
    }

    // 系統管理
    if (menuItem.actionUrl === '/systemManage') {
      menuItem.children &&
        menuItem.children.map((level2MenuItem) => {
          // 登入帐号管理
          if (level2MenuItem.actionUrl === '/loginAccountMange') {
            level2MenuItem.actionUrl = '/cms/systemManage/loginAccountMange';
          }
        });
    }

    // 数据统计
    if (menuItem.actionUrl === '/businessStatistics') {
      menuItem.children &&
        menuItem.children.map((level2MenuItem) => {
          // 新客日统计转化率
          if (level2MenuItem.actionUrl === '/Registrations') {
            level2MenuItem.actionUrl = '/cms/businessStatistics/Registrations';
          }
          // 用户复借统计
          if (level2MenuItem.actionUrl === '/reloanStatistics') {
            level2MenuItem.actionUrl =
              '/cms/businessStatistics/reloanStatistics';
          }
          // 新客风控回款率
          if (level2MenuItem.actionUrl === '/newCustomerRiskPaymentRate') {
            level2MenuItem.actionUrl =
              '/cms/businessStatistics/newCustomerRiskPaymentRate';
          }
          // 每日用户风控标签统计
          if (level2MenuItem.actionUrl === '/riskControlStatistic') {
            level2MenuItem.actionUrl =
              '/cms/businessStatistics/riskControlStatistic';
          }
        });
    }

    // 当日催收
    if (menuItem.actionUrl === '/todayLoanManage') {
      menuItem.children &&
        menuItem.children.map((level2MenuItem) => {
          // 当日订单分配
          if (level2MenuItem.actionUrl === '/todayOrderDistribute') {
            level2MenuItem.actionUrl =
              '/cms/todayLoanManage/todayOrderDistribute';
          }
          // 当日电催列表
          if (level2MenuItem.actionUrl === '/todayPhoneUrgeList') {
            level2MenuItem.actionUrl =
              '/cms/todayLoanManage/todayPhoneUrgeList';
          }
          // 当日电催明細
          if (level2MenuItem.actionUrl === '/collect-detail') {
            level2MenuItem.actionUrl = '/cms/todayLoanManage/collect-detail';
          }
        });
    }

    // 逾期催收
    if (menuItem.actionUrl === '/afterLoanManage') {
      menuItem.children &&
        menuItem.children.map((level2MenuItem) => {
          // 逾期订单分配
          if (level2MenuItem.actionUrl === '/overdueOrderDistribute') {
            level2MenuItem.actionUrl =
              '/cms/afterLoanManage/overdueOrderDistribute';
          }
          // 逾期电催列表
          if (level2MenuItem.actionUrl === '/phoneUrgeList') {
            level2MenuItem.actionUrl = '/cms/afterLoanManage/phoneUrgeList';
          }
          // 逾期电催明細
          if (level2MenuItem.actionUrl === '/collect-detail') {
            level2MenuItem.actionUrl = '/cms/afterLoanManage/collect-detail';
          }
        });
    }

    // 客服管理
    if (menuItem.actionUrl === '/customer-service-manage') {
      menuItem.children &&
        menuItem.children.map((level2MenuItem) => {
          // 客服管理
          if (level2MenuItem.actionUrl === '/feedback') {
            level2MenuItem.actionUrl = '/cms/customer-service-manage/feedback';
          }
        });
    }
    return menuItem;
  });
};
