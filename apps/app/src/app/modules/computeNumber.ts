type ComputeNumberType = "+" | "-" | "*" | "/";

export function computeNumber(a: number, type: ComputeNumberType, b: number) {
  /**
   * 獲取數字小數點的長度
   * @param {number} n 數字
   */
  function getDecimalLength(n: number) {
    const decimal = n.toString().split(".")[1];
    return decimal ? decimal.length : 0;
  }
  /**
   * 修正小數點
   * @description 防止出現 `33.33333*100000 = 3333332.9999999995` && `33.33*10 = 333.29999999999995` 這類情況做的處理
   * @param {number} n
   */
  const amend = (n: number, precision = 15) => parseFloat(Number(n).toPrecision(precision));
  const power = Math.pow(10, Math.max(getDecimalLength(a), getDecimalLength(b)));
  let result = 0;

  a = amend(a * power);
  b = amend(b * power);

  switch (type) {
    case "+":
      result = (a + b) / power;
      break;
    case "-":
      result = (a - b) / power;
      break;
    case "*":
      result = (a * b) / (power * power);
      break;
    case "/":
      result = a / b;
      break;
  }

  result = amend(result);

  return {
    /** 計算結果 */
    result,
    /**
     * 繼續計算
     * @param {"+"|"-"|"*"|"/"} nextType 繼續計算方式
     * @param {number} nextValue 繼續計算的值
     */
    next(nextType: any, nextValue: any) {
      return computeNumber(result, nextType, nextValue);
    }
  }
}
