import Cookies from 'js-cookie';

export const getIsSuperAdmin = (): unknown => {
    return JSON.parse(localStorage.getItem('isSuperAdmin'));
};

type UserInfo = {
    data: {
        phoneNo: string;
    };
};

export const getAdminUser = (): UserInfo => {
    return JSON.parse(Cookies.get('adminUser'));
};
