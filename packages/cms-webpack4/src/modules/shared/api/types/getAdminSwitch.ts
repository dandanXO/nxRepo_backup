

export interface GetAdminSwitchResponse {
    todayCollect: {
        contactSwitch: boolean,
        smsSwitch: boolean
    },
    overDueCollect: {
        contactSwitch: boolean,
        smsSwitch: boolean
    }
}
