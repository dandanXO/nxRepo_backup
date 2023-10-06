export const getCurrentUnixTimestamp = () => {
  return Math.round(new Date().getTime() / 1000);
};
