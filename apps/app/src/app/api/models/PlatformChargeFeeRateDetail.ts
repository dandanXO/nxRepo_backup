export type PlatformChargeFeeRateDetail = {
  counting:	number;
  // 费率占比%

  key:	"DAILY_FEE" | "GST" | "LOAN_AMOUNT" | "LOAN_INTEREST" | "PENALTY_INTEREST" | "PROCESSING_FEE" | "REDUCTION_AMOUNT" | "SERVICE_FEE";
  // KEY值

  title:	string;
  // 收取项目


}
