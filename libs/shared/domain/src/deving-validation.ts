// import {
//   IsBoolean,
//   IsDecimal,
//   IsDefined,
//   IsEmail,
//   IsIn,
//   IsNotEmpty,
//   IsNumber, IsNumberString, IsString,
//   Max,
//   Min, MinLength,
//   ValidateIf, ValidateNested,
//   validateSync, ValidationError,
// } from "class-validator";
//
// import { classToPlain, instanceToPlain } from "class-transformer";
//
//
// interface GetProductListResponseProduct {
//   /** 后台管理者账号*/
//   adminUsername?: string;
//   /** 广告放款额度 */
//   amountRange?: string;
//   /** 广告放款通过率 */
//   approveRate?: string;
//   /** 广告放款通过时间 */
//   approveTime?: string;
//   /** 背景圖 */
//   backgroundImg?: string;
//   /** 客服電話 */
//   csContact?: string;
//   /** 客服信箱 */
//   csEmail?: string;
//   /** 客服时间 */
//   csTime?: string;
//   /** 日利息费率(天) */
//   dailyRate?: number;
//   /** 是否為空放產品 */
//   dummy?: boolean;
//   /** 启用/停用 */
//   enabled?: boolean;
//   /** 是否可展期 */
//   extensible?: boolean;
//   /** 逾期N天内可展期 */
//   extensibleOverdueDays?: number;
//   /** 展期费率 */
//   extensionRate?: number;
//   /** 广告放款利率 */
//   interestRange?: string;
//   /** 借款周期 */
//   loanTerm?: number;
//   /** 初始贷款额度 */
//   loanAmount?: number;
//   /** 新客最大放款量 */
//   newGuestMaxThreshold?: number;
//   /** 产品logo url */
//   logo?: string;
//   /** 商户流水号 */
//   merchantId?: string;
//   /** 最高可借金额 */
//   maxAmount?: number;
//   /** 逾期费率(天) */
//   overdueRate?: number;
//   /** 后置利率 */
//   postInterestRate?: number;
//   /** 前置利率 */
//   preInterestRate?: number;
//   /** 产品流水号 */
//   productId?: number;
//   /** 服务利率提额配置 */
//   productInterestRatePairs?: GetProductInterestRatePairs[];
//   /** 产品名称 */
//   productName?: string;
//   /** 老客贷款额度 */
//   reLoanAmount?: number;
//   /** 次新客最大放款量: 第二次借款的老客 */
//   renewMaxThreshold?: number;
//   /** 还款链结有效天数 */
//   repayExpiryDays?: number;
//   /** 是否显示借款金额 */
//   showQuota?: boolean;
//   /** 热门标签 */
//   tags?: string;
//   /** 申请详情模版类型 (1: 一般 , 2: 合同金額=到手)
//    @enum {number}
//    */
//   templateType?: 1 | 2;
//   /** 广告借款周期 */
//   termRange?: string;
//   /** 置顶 */
//   top?: boolean;
//   /** 权重 */
//   weight?: number;
//   /** 创建时间 */
//   createTime?:string;
//   /** 修改时间 */
//   updateTime?:string;
// }
//
// export interface GetProductInterestRatePairs {
//   /** 提额次数 */
//   num?: number;
//   /** 后置利率 */
//   postInterest?: number;
//   /** 前置利率 */
//   preInterest?: number;
// }
//
//
//
// const numberToFixedNumber = (number: number, digits = 2): number => {
//   return Number((number).toFixed(digits));
// }
//
// const numberToPercentFixedNumber = (number: number, digits = 2): number => {
//   return Number((number * 0.01).toFixed(digits));
// }
//
//
// enum TemplateTypeEnum {
//   REPAYMENT_SAME_CONTRACT_PRICE,
//   GET_IT__SAME_CONTRACT_PRICE
// }
//
// type BaseValidatorError = {
//   property: string,
//   message: string;
// }
//
// class BaseValidator {
//   validate(): BaseValidatorError[] {
//     const validations: ValidationError[] = validateSync(this, {
//       validationError: {
//         target: false,
//       },
//       stopAtFirstError: true,
//       skipMissingProperties: true,
//     });
//     const errors = validations.map(validation => {
//       const messageKey = Object.keys(validation.constraints)[0];
//       return {
//         property: validation.property,
//         message: validation.constraints[messageKey],
//       }
//     })
//     return errors;
//   }
// }
//
// // NOTICE: skipMissingProperties
// export class ProductInterestRatePairs {
//
//   /** 提额次数 */
//   @IsNotEmpty({
//     message: "请输入起始期数"
//   })
//   num?: number;
//
//   @IsNotEmpty({
//     message: "请输入前置利息"
//   })
//   @Min(0, {
//     message: "请填写0-100间数字"
//   })
//   @Max(100, {
//     message: "请填写0-100间数字"
//   })
//   /** 后置利率 */
//   private _postInterest?: number;
//
//   set postInterestRate(value) {
//     this._postInterest = numberToFixedNumber(value);
//   }
//   get postInterestRate() {
//     return this._postInterest;
//   }
//
//
//   @IsNotEmpty({
//     message: "请输入后置利息"
//   })
//   @Min(0, {
//     message: "请填写0-100间数字"
//   })
//   @Max(100, {
//     message: "请填写0-100间数字"
//   })
//   /** 前置利率 */
//   private _preInterest?: number;
//
//   set preInterestRate(value) {
//     this._preInterest = numberToFixedNumber(value);
//   }
//   get preInterestRate() {
//     return this._preInterest;
//   }
// }
//
// export type IProductModel = GetProductListResponseProduct;
//
// export abstract class ProductModel extends BaseValidator implements IProductModel{
//   // NOTICE: 後端移除
//   /** 管理者密码 */
//   // adminPassword?: string;
//
//   // NOTICE: 後端移除
//   /** 管理者账号 */
//   // adminUsername?: string;
//
//   /** 广告放款额度 */
//   abstract amountRange?: string;
//
//   /** 广告放款通过率 */
//   @IsNotEmpty({
//     message: "请输入通过率"
//   })
//   approveRate?: string;
//
//
//   /** 广告放款通过时间 */
//   abstract approveTime?: string;
//
//   /** 背景圖 */
//   backgroundImg?: string;
//
//   /** 客服信箱 */
//   @IsEmail()
//   csEmail?: string;
//
//   /** 客服时间 */
//   @IsNotEmpty({
//     message: "请输入客服时间"
//   })
//     // TODO
//   csTime?: string;
//
//
//   /** 日利息费率(天) */
//   @IsNotEmpty({
//     message: "请输入日利息"
//   })
//   @Min(0, {
//     message: "请填写0-36间数字"
//   })
//   @Max(36, {
//     message: "请填写0-36间数字"
//   })
//   set dailyRate(value) {
//     this._dailyRate = numberToPercentFixedNumber(value);
//   }
//   get dailyRate() {
//     return this._dailyRate;
//   }
//   private _dailyRate?: number;
//
//
//   /** 启用/停用 */
//   @IsBoolean()
//   enabled?: boolean;
//
//   /** 是否可展期 */
//   @IsBoolean()
//   extensible?: boolean;
//
//   /** 逾期N天内可展期 */
//   @IsNotEmpty({
//     message: "请输入逾期超过"
//   })
//   @Min(1, {
//     message: "填写 1-365 间正整数",
//   })
//   @Max(365, {
//     message: "填写 1-365 间正整数"
//   })
//   extensibleOverdueDays?: number;
//
//   /** 展期费率 */
//   @IsNotEmpty({
//     message: "请输入展期利率",
//   })
//   @Min(0, {
//     message: "请填写0-100间数字",
//   })
//   @Max(100, {
//     message: "请填写0-100间数字"
//   })
//   set extensionRate(value) {
//     this._extensionRate = numberToPercentFixedNumber(value);
//   }
//   get extensionRate() {
//     return this._extensionRate;
//   }
//   private _extensionRate?: number;
//
//
//   /** 广告放款利率 */
//   abstract interestRange?: string;
//
//   /** 借款周期 */
//   @Min(1, {
//     message: "请填写大于1的正整数",
//   })
//   loanTerm?: number;
//
//   /** 产品logo url */
//   @IsNotEmpty({
//     message: "请输入Logo"
//   })
//   logo?: string;
//
//   /** 最高可借金额 */
//   maxAmount?: number;
//
//
//   /** 商户流水号 */
//   // NOTICE: error
//   // @MinLength(1,{
//   //     message: "请输入商户名"
//   // })
//   // NOTICE: didn't work
//   // @IsNumberString({
//   //     message: "请输入商户名"
//   // })
//   // NOTICE: didn't work
//   // @IsNotEmpty({
//   //     message: "请输入商户名"
//   // })
//   // NOTICE: work 50%, but always validate
//   // @IsDefined({
//   //     message: "请输入商户名"
//   // })
//   // merchantId?: string;
//
//   @IsNotEmpty({
//     message: "请输入商户名"
//   })
//   set merchantId(num: string) {
//     this._merchantId = num;
//   }
//   private _merchantId: string;
//
//   /** 逾期费率(天) */
//   @IsNotEmpty({
//     message: "请输入逾期费率"
//   })
//   @Min(0, {
//     message: "请填写0-100间数字"
//   })
//   @Max(100, {
//     message: "请填写0-100间数字"
//   })
//   set overdueRate(value) {
//     this._overdueRate = numberToPercentFixedNumber(value);
//   }
//   get overdueRate() {
//     return this._overdueRate;
//   }
//   private _overdueRate?: number;
//
//   /** 后置利率 */
//   @IsNotEmpty({
//     message: "请输入后置利息"
//   })
//   @Min(0, {
//     message: "填写 0 - 100 间数字"
//   })
//   @Max(100, {
//     message: "填写 0 - 100 间数字"
//   })
//   @ValidateIf( o => o.preInterestRate + o.postInterestRate <= 100, {
//     message: "前置利息＋后置利息不得超过100%"
//   })
//   postInterestRate?: number;
//
//   /** 前置利率 */
//   @IsNotEmpty({
//     message: "请输入前置利息"
//   })
//   @Min(0, {
//     message: "填写 0 - 100 间数字"
//   })
//   @Max(100, {
//     message: "填写 0 - 100 间数字"
//   })
//
//   @ValidateIf( o => o.preInterestRate + o.postInterestRate <= 100, {
//     message: "前置利息＋后置利息不得超过100%"
//   })
//   set preInterestRate(value) {
//     this._preInterestRate = numberToPercentFixedNumber(value);
//   }
//   get preInterestRate() {
//     return this._preInterestRate;
//   }
//   _preInterestRate?: number;
//
//
//   /** 服务利率提额配置 */
//   abstract productInterestRatePairs?: string;
//
//   /** 产品名称 */
//   @IsNotEmpty({
//     message: "请输入产品名"
//   })
//   productName?: string;
//
//   /** 还款链结有效天数 */
//   repayExpiryDays?: number;
//   /** 是否显示借款金额 */
//   showQuota?: boolean;
//
//
//   /** 热门标签 */
//   @IsNotEmpty({
//     message: "至少1笔，至多3笔"
//   })
//   abstract tags?: string;
//
//   /** 申请详情模版类型 (1: 一般 , 2: 合同金額=到手)
//    @enum {number}
//    */
//   @IsIn([1, 2])
//   templateType?: 1 | 2;
//
//   /** 广告借款周期 */
//   abstract termRange?: string;
//
//   /** 置顶 */
//   @IsBoolean()
//   top?: boolean;
//
//   /** 权重 */
//   @Min(1, {
//     message: "填写 1-99 间的数字"
//   })
//   @Max(99, {
//     message: "填写 1-99 间的数字"
//   })
//   weight?: number;
// }
//
// export interface IProductFormViewModel {
//   // amountRangeLow: number;
//   // amountRangeHigh: number;
//   // approveTimeValue: string;
//   // approveTimeUnit: string;
//   // termRangeLow: number;
//   // interestRangeLow: number;
//   // interestRangeHigh: number;
//   // termRangeHigh: number;
//   // productInterestRatePairs: string;
//   // tags: string;
//
//   amountRangeLow: string;
//   amountRangeHigh: string;
//   approveTimeValue: string;
//   approveTimeUnit: string;
//   termRangeLow: string;
//   interestRangeLow: string;
//   interestRangeHigh: string;
//   termRangeHigh: string;
//   productInterestRatePairs: string;
//   tags: string;
// }
//
// export type ViewModalInputItem<T> = {
//   [key in keyof T]?: {
//     validateStatus: undefined | "error"
//     message: string;
//   }
// }
//
// function props(obj) {
//   var p = [];
//   for (; obj != null; obj = Object.getPrototypeOf(obj)) {
//     var op = Object.getOwnPropertyNames(obj);
//     for (var i=0; i<op.length; i++)
//       if (p.indexOf(op[i]) == -1)
//         p.push(op[i]);
//   }
//   return p;
// }
//
// export class ViewModelFormItems {
//   public static getFormItems(obj) {
//     // console.log("obj", obj);
//     // window["obj"] = obj
//
//     let propertiesFormItems = props(obj);
//     propertiesFormItems = propertiesFormItems.filter(property => [
//       // "constructor",
//       // "toLocaleString",
//       // "__proto__",
//       // "valueOf",
//       // "__defineGetter__",
//       // "__defineSetter__",
//       // "__lookupGetter__",
//       // "__lookupSetter__",
//       // "hasOwnProperty",
//       // "propertyIsEnumerable",
//       // "isPrototypeOf",
//       // "toString",
//     ].indexOf(property) === -1)
//
//     // console.log("propertiesFormItems", propertiesFormItems);
//
//     let propertiesFormItems2 = props(obj.__proto__);
//     // console.log("propertiesFormItems2", propertiesFormItems2);
//
//     let photo2 = classToPlain(obj)
//     console.log("photo2", photo2);
//
//     let photo3 = instanceToPlain(obj)
//     console.log("photo3", photo3);
//
//     const propertiesFormItems = {}
//
//     for (var key in obj) {
//         if (obj.getOwnPropertyNames(key)) { // 過濾
//             console.log(key, ":", obj[key]);
//         }
//     }
//
//     Object.getOwnPropertyNames(obj.__proto__).map((key) => {
//         console.log("key", key)
//         propertiesFormItems[key] = {
//             validateStatus: undefined,
//             message: "",
//         }
//     })
//     Object.getOwnPropertyNames(obj.__proto__.constructor.__proto__).map((key) => {
//         console.log("key", key)
//         propertiesFormItems[key] = {
//             validateStatus: undefined,
//             message: "",
//         }
//     })
//
//     return propertiesFormItems;
//   }
// }
// export class ProductFormViewModel extends ProductModel implements IProductFormViewModel {
//   constructor() {
//     super();
//   }
//   @IsNotEmpty({
//     message: "请输入最低额度"
//   })
//   amountRangeLow: string;
//
//   @IsNotEmpty({
//     message: "请输入最高额度"
//   })
//   amountRangeHigh: string;
//
//   override get amountRange () {
//     return `${this.amountRangeLow}-${this.amountRangeHigh}`;
//   }
//
//   @IsNotEmpty({
//     message: "请输入审核通过时间"
//   })
//     // NOTICE: FIXME
//   approveTimeValue: string;
//
//   @IsIn(["mins", "hours"])
//   approveTimeUnit: string;
//
//   override get approveTime() {
//     return `${this.approveTimeValue} ${this.approveTimeUnit}`;
//   }
//
//   @IsNotEmpty({
//     message: "请输入最低利息"
//   })
//   @IsNotEmpty({
//     message: "请输入最低利息"
//   })
//   @IsDecimal({
//     decimal_digits: "2"
//   }, {
//     message: "至多填写至小数点后两位"
//   })
//   interestRangeLow: string;
//
//   @IsNotEmpty({
//     message: "请输入最高利息"
//   })
//   @IsDecimal({
//     decimal_digits: "2"
//   }, {
//     message: "至多填写至小数点后两位"
//   })
//   interestRangeHigh: string;
//
//   override get interestRange() {
//     return `${this.interestRangeLow} - ${this.interestRangeHigh}% / day`;
//   }
//
//   @IsNotEmpty({
//     message: "请输入最低天数"
//   })
//   @Min(1, {
//     message: "请填写1-365间数字%"
//   })
//   @Max(365, {
//     message: "请填写1-365间数字%"
//   })
//   set termRangeLow(value: string) {
//     this._termRangeLow = Number(value)
//   }
//   get termRangeLow() {
//     // @ts-ignore
//     return this._termRangeLow;
//   }
//   _termRangeLow: number;
//
//   @Min(1, {
//     message: "请填写1-365间数字%"
//   })
//   @Max(365, {
//     message: "请填写1-365间数字%"
//   })
//   @IsNumber({
//
//   }, {
//     message: "請輸入數字"
//   })
//   termRangeHigh: string;
//
//   override get termRange() {
//     return `${this.termRangeLow}-${this.termRangeHigh}Days`
//   }
//
//   @ValidateNested()
//   set productInterestRatePairsValue(values: ProductInterestRatePairs[]) {
//     const productInterestRatePairs = values.map(pair => {
//       const data = new ProductInterestRatePairs();
//       data.num = pair.num;
//       data.preInterestRate = numberToPercentFixedNumber(pair.preInterestRate, 3);
//       data.postInterestRate = numberToPercentFixedNumber(pair.postInterestRate, 3);
//       return data;
//     })
//     this._productInterestRatePairs = productInterestRatePairs;
//   }
//   _productInterestRatePairs?: ProductInterestRatePairs[];
//
//
//   override get productInterestRatePairs() {
//     return JSON.stringify(this.productInterestRatePairsValue);
//   }
//
//   set tagsValue(strArray: string[] | undefined) {
//     this._tags = strArray ? strArray.join(",") : ""
//   }
//   // @ts-ignore
//   // NOTICE: [型引数が制御フロー解析で絞り込まれるように](https://zenn.dev/aumy/articles/typescript-430)
//   get tagsValue(): string {
//     // FIXME:
//     return this._tags;
//   }
//   private _tags: string;
//
//   override get tags() {
//     return this.tagsValue;
//   }
//
//
// }
