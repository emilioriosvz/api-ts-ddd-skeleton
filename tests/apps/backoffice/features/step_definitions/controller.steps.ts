import assert from "assert";
import { AfterAll, BeforeAll, Given, Then } from "@cucumber/cucumber";
import request from "supertest";

import { BackofficeApp } from "../../../../../src/apps/backoffice/BackofficeApp";

let _request: request.Test;
let application: BackofficeApp | undefined;
let _response: request.Response;

Given("I send a GET request to {string}", (route: string) => {
  if (!application?.httpServer) {
    throw new Error("HTTP server is not initialized");
  }
  _request = request(application.httpServer).get(route);
});

Then("the response status code should be {int}", async (status: number) => {
  _response = await _request.expect(status);
});

Given(
  "I send a PUT request to {string} with body:",
  (route: string, body: string) => {
    if (!application?.httpServer) {
      throw new Error("HTTP server is not initialized");
    }
    _request = request(application?.httpServer)
      .put(route)
      .send(JSON.parse(body) as object);
  },
);

Then("the response should be empty", () => {
  assert.deepStrictEqual(_response.body, {});
});

BeforeAll(() => {
  application = new BackofficeApp();
  application.start();
});

AfterAll(() => {
  application?.stop();
});
