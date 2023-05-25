import Cookies from "js-cookie";
export const getIsSuperAdmin = () => {
    return JSON.parse(localStorage.getItem("isSuperAdmin"));
};

export const getAdminUser = () => {
    return JSON.parse(Cookies.get("adminUser"));
};
