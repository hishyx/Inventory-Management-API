import type { NextFunction, Request, Response } from "express";
import type httpError from "../utils/custom.error.class.js";

export const errorHandlingMiddleware = (
  err: httpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("error detected");
  console.log(err);

  res.status(err.statusCode || 500).json({
    message: err.message,
  });
};
