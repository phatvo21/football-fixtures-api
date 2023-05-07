export const convertStringToArray = (str: string): Array<string> => {
  return str.split(',').map((string) => string.trim());
};
