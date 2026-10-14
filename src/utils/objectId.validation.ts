import mongoose from "mongoose";
import httpError from "./custom.error.class.js";

export const isValidObjectId: (id: unknown) => asserts id is string = (id) => {
  if (typeof id !== "string" || !mongoose.isObjectIdOrHexString(id)) {
    throw new httpError("Invalid document ID", 400);
  }
};
