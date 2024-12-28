export const deepClone = <T>(obj: T) => {
  return JSON.parse(JSON.stringify(obj));
};
