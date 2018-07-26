/**
 * @author dondevi
 * @create 2018-06-07
 */

export const SVM_TYPES = [
  { value: 100, name: "C_SVC" },
  { value: 101, name: "NU_SVC" },
  { value: 102, name: "ONE_CLASS" },
  { value: 103, name: "EPS_SVR" },
  { value: 104, name: "NU_SVR" },
];

export const KERNAL_TYPES = [
  // { value: -1, name: "CUSTOM" },
  { value: 0, name: "LINEAR" },
  { value: 1, name: "POLY" },
  { value: 2, name: "RBF" },
  { value: 3, name: "SIGMOID" },
  { value: 4, name: "CHI2" },
  { value: 5, name: "INTER" },
];

export const PARAM_TYPES = [
  { value: 0, name: "C" },
  { value: 1, name: "GAMMA" },
  { value: 2, name: "P" },
  { value: 3, name: "NU" },
  { value: 4, name: "COEF" },
  { value: 5, name: "DEGREE" },
];
