import { NextFunction, Router, Response, Request } from "express";
import { globSync } from "glob";
import { validationResult } from "express-validator";
import httpStatus from "http-status-codes";

export function registerRoutes(router: Router): void {
  const routes = globSync(`${__dirname}/**/*.route.*`);
  routes.map((route) => register(route, router));
}

function register(routePath: string, router: Router) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { register } = require(routePath) as {
    register: (router: Router) => void;
  };
  register(router);
}

export function validateReqSchema(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const ValidationError = validationResult(req);
  if (ValidationError.isEmpty()) return next();

  const errors = ValidationError.array().map((err) => err.msg);
  res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ errors });
}
