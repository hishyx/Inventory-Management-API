import httpError from "../../application/utils/custom.error.class.js";

export const getParam = (value: unknown): string => {
  if (typeof value !== "string" || !value.trim()) {
    throw new httpError("Invalid route parameter");
  }

  return value;
};
