export const processRoutesForNewCMS = (data) => {
  return data.map(menuItem => {
    // APP 配置
    if (menuItem.actionUrl === "/appSetting") {
      menuItem.children && menuItem.children.map(level2MenuItem => {
        // APP 配置
        if (level2MenuItem.actionUrl === "/appSettingManage") {
          level2MenuItem.actionUrl = "/cms/app-manage";
        }
      })
    }
    // 用戶管理
    if (menuItem.actionUrl === "/userManage") {
      menuItem.children && menuItem.children.map(level2MenuItem => {
        // 用戶管理
        if (level2MenuItem.actionUrl === "/userInfoManage") {
          level2MenuItem.actionUrl = "/cms/user";
        }
        // 用戶終審
        if (level2MenuItem.actionUrl === "/userLastCheck") {
          level2MenuItem.actionUrl = "/cms/user-review";
        }
        // 用戶審核紀錄
        if (level2MenuItem.actionUrl === "/userCheckRecord") {
            level2MenuItem.actionUrl = "/cms/user-review-record";
          }
        // 黑名單
        if (level2MenuItem.actionUrl === "/blackListManage") {
          level2MenuItem.actionUrl = "/cms/blacklist";
        }
        // 白名單
        if (level2MenuItem.actionUrl === "/whiteListManage") {
          level2MenuItem.actionUrl = "/cms/whitelist";
        }
      })
    }
    // 渠道管理
    if (menuItem.actionUrl === "/channelManage") {
      menuItem.children && menuItem.children.map(level2MenuItem => {
        if (level2MenuItem.actionUrl === "/channelList") {
          level2MenuItem.actionUrl = "/cms/channel";
        }
      })
    }

    if (menuItem.actionUrl === "/platform-manage") {
      menuItem.children && menuItem.children.map(level2MenuItem => {
        if (level2MenuItem.actionUrl === "/merchant-manage") {
          level2MenuItem.actionUrl = "/cms/merchant";
        } else if (level2MenuItem.actionUrl === "/product-manage") {
          level2MenuItem.actionUrl = "/cms/product";
        }
      })
    }
    if (menuItem.actionUrl === "/riskConfigManage") {
      menuItem.children && menuItem.children.map(level2MenuItem => {
        if (level2MenuItem.actionUrl === "/risk-model-setting") {
          level2MenuItem.actionUrl = "/cms/risk-setting";
        }
      })
    }

    if (menuItem.actionUrl === "/orderManagement") {
      menuItem.children && menuItem.children.map(level2MenuItem => {
        // 訂單列表
        if (level2MenuItem.actionUrl === "/orderList") {
          level2MenuItem.actionUrl = "/cms/order";
        }
         // 訂單終審
         if (level2MenuItem.actionUrl === "/businessRepeatCheck") {
            level2MenuItem.actionUrl = "/cms/order-review";
          }
        // 訂單終審
        if (level2MenuItem.actionUrl === "/businessLastCheck") {
          level2MenuItem.actionUrl = "/cms/order-final-review";
        }

        // 訂單終審紀錄
        if (level2MenuItem.actionUrl === "/checkRecord") {
            level2MenuItem.actionUrl = "/cms/order-review-record";
        }
      })
    }
    if (menuItem.actionUrl === "/h5Manage") {
      menuItem.children && menuItem.children.map(level2MenuItem => {
        // 廣告管理
        if (level2MenuItem.actionUrl === "/activity-setting") {
          level2MenuItem.actionUrl = "/cms/activity-ads";
        }
      })
    }

    // 财务管理
    if (menuItem.actionUrl === "/paymentManage") {
        menuItem.children && menuItem.children.map(level2MenuItem => {
            // 还款补单
            if (level2MenuItem.actionUrl === "/pay-receipt") {
                level2MenuItem.actionUrl = "/cms/pay-receipt";
            }
        })
    }

    // 系統管理
    if (menuItem.actionUrl === "/systemManage") {
        menuItem.children && menuItem.children.map(level2MenuItem => {
            // 登入帐号管理
            if (level2MenuItem.actionUrl === "/loginAccountMange") {
                level2MenuItem.actionUrl = "/cms/loginAccountMange";
            }
        })
    }

    // 数据统计
    if (menuItem.actionUrl === "/businessStatistics") {
      menuItem.children && menuItem.children.map(level2MenuItem => {
        // 每日风控标签统计
        if (level2MenuItem.actionUrl === "/riskControlStatistic") {
          level2MenuItem.actionUrl = "/cms/riskControlStatistic";
        }
        // 新客风控回款率
        if (level2MenuItem.actionUrl === "/newCustomerRiskPaymentRate") {
          level2MenuItem.actionUrl = "/cms/new-customer-repayment-rate";
        }
        if (level2MenuItem.actionUrl === "/Registrations") {
            level2MenuItem.actionUrl = "/cms/Registrations";
        }
        if (level2MenuItem.actionUrl === "/reloanStatistics") {
            level2MenuItem.actionUrl = "/cms/reloanStatistics";
        }
      })
    }

    // 当日催收
    if (menuItem.actionUrl === "/todayLoanManage") {
      menuItem.children && menuItem.children.map(level2MenuItem => {
        // 当日订单分配
        if (level2MenuItem.actionUrl === "/todayOrderDistribute") {
          level2MenuItem.actionUrl = "/cms/today-distribution";
        }
      })
    }

    // 逾期催收
    if (menuItem.actionUrl === "/afterLoanManage") {
      menuItem.children && menuItem.children.map(level2MenuItem => {
        // 逾期订单分配
        if (level2MenuItem.actionUrl === "/overdueOrderDistribute") {
          level2MenuItem.actionUrl = "/cms/overdue-distribution";
        }
      })
    }
    return menuItem;
  })
}
