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
    return menuItem;
  })
}
