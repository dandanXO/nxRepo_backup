// import {PostLoginRequest} from "../../../../../external/LoginEndpoint";
// import {Length} from "class-validator";
//
// export class LoginFormData implements PostLoginRequest {
//   get sysTimezone(): null {
//     return this._sysTimezone;
//   }
//
//   set sysTimezone(value: null) {
//     this._sysTimezone = value;
//   }
//   get sysLanguage(): null {
//     return this._sysLanguage;
//   }
//
//   set sysLanguage(value: null) {
//     this._sysLanguage = value;
//   }
//   get phone(): string {
//     return this._phone;
//   }
//
//   @Length(10, 11)
//   set phone(value: string) {
//     this._phone = value;
//   }
//   get password(): string {
//     return this._password;
//   }
//
//   set password(value: string) {
//     this._password = value;
//   }
//   get deviceVersion(): string {
//     return this._deviceVersion;
//   }
//
//   set deviceVersion(value: string) {
//     this._deviceVersion = value;
//   }
//   get deviceModel(): string {
//     return this._deviceModel;
//   }
//
//   set deviceModel(value: string) {
//     this._deviceModel = value;
//   }
//   get deviceId(): string {
//     return this._deviceId;
//   }
//
//   set deviceId(value: string) {
//     this._deviceId = value;
//   }
//   get appVersion(): string {
//     return this._appVersion;
//   }
//
//   set appVersion(value: string) {
//     this._appVersion = value;
//   }
//   get appPackageName(): string {
//     return this._appPackageName;
//   }
//
//   set appPackageName(value: string) {
//     this._appPackageName = value;
//   }
//   get appChannel(): string {
//     return this._appChannel;
//   }
//
//   set appChannel(value: string) {
//     this._appChannel = value;
//   }
//   private _appChannel: string;
//   private _appPackageName: string;
//   private _appVersion: string;
//   private _deviceId: string;
//   private _deviceModel: string;
//   private _deviceVersion: string;
//   private _password: string;
//   private _phone: string;
//   private _sysLanguage: null;
//   private _sysTimezone: null;
//
//   constructor({
//                 appChannel,
//                 appPackageName,
//                 appVersion,
//                 deviceId,
//                 deviceModel,
//                 deviceVersion,
//                 password,
//                 phone,
//                 sysLanguage,
//                 sysTimezone,
//               }: PostLoginRequest) {
//     this._appChannel = appChannel;
//     this._appPackageName = appPackageName;
//     this._appVersion = appVersion;
//     this._deviceId = deviceId;
//     this._deviceModel = deviceModel;
//     this._deviceVersion = deviceVersion;
//     this._password = password;
//     this._phone = phone;
//     this._sysLanguage = sysLanguage;
//     this._sysTimezone = sysTimezone;
//   }
// }
