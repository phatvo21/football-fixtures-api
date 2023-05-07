export const convertStringToArray = (str: string): Array<string> => {
  return str.split(',').map((str) => str.trim());
};
