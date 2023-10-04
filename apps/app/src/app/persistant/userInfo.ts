class UserInfoPersistence {
  set phone(name: string) {
    localStorage.setItem("phone", name);
  }
  get phone(): string {
    return localStorage.getItem("phone") || "";
  }
  clearPhone() {
    localStorage.removeItem("phone");
  }
}
export const userInfoPersistence = new UserInfoPersistence();
