// const baseUrl = "http://localhost:2200";
const baseUrl = "https://tame-tan-python-garb.cyclic.app/";

export const api = `${baseUrl}/api`;
export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
