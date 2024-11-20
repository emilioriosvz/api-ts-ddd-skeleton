import { Router } from "express";
import { globSync } from "glob";

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
