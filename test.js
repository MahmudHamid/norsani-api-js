"use strict";

import NorsaniRestApi from "./index";
import nock from "nock";

describe("#options", () => {
  test("wpAPIPrefix should set WP REST API custom path", () => {
    const api = new NorsaniRestApi({
      url: "https://test.dev",
      consumerKey: "ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      consumerSecret: "cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      wpAPIPrefix: "wp-rest",
    });

    const endpoint = "products";
    const expected = "https://test.dev/wp-rest/wc/v3/" + endpoint;
    const requestapi = 'wc';
    const url = api._getUrl(endpoint, requestapi);

    expect(url).toBe(expected);
  });
});

describe("#methods", () => {
  const api = new NorsaniRestApi({
    url: "https://test.dev",
    consumerKey: "ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    consumerSecret: "cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  });

  test("_getUrl should return full endpoint URL", () => {
    const endpoint = "getmainmenu";
    const expected = "https://test.dev/wp-json/norsani/v1/" + endpoint;
    const requestapi = 'norsani';
    const url = api._getUrl(endpoint, requestapi);

    expect(url).toBe(expected);
  });

  test("_normalizeQueryString should return query string sorted by name", () => {
    const url =
      "http://test.dev/wp-json/wc/v3/products?filter[q]=Woo+Album&fields=id&filter[limit]=1";
    const expected =
      "http://test.dev/wp-json/wc/v3/products?fields=id&filter[limit]=1&filter[q]=Woo%20Album";
    const normalized = api._normalizeQueryString(url);

    expect(normalized).toBe(expected);
  });
});

describe("#requests", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  const api = new NorsaniRestApi({
    url: "https://test.dev",
    consumerKey: "ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    consumerSecret: "cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  });

  test("should return content for basic auth", () => {
    expect.assertions(1);

    nock("https://test.dev/wp-json/wc/v3")
      .post("/orders", {})
      .reply(201, {
        ok: true
      });

    return api.post("orders", 'wc', {}).then(response => {
      expect(response.status).toBe(201);
    });
  });

  test("should return content for get requests", () => {
    expect.assertions(1);
    nock("https://test.dev/wp-json/wc/v3")
      .get("/orders")
      .reply(200, {
        ok: true
      });

    return api.get("orders", 'wc', {}).then(response => {
      expect(response.status).toBe(200);
    });
  });

  test("should return content for put requests", () => {
    expect.assertions(1);
    nock("https://test.dev/wp-json/wc/v3")
      .put("/orders")
      .reply(200, {
        ok: true
      });

    return api.put("orders", 'wc', {}).then(response => {
      expect(response.status).toBe(200);
    });
  });

  test("should return content for delete requests", () => {
    expect.assertions(1);
    nock("https://test.dev/wp-json/wc/v3")
      .delete("/orders")
      .reply(200, {
        ok: true
      });

    return api.delete("orders", 'wc', {}).then(response => {
      expect(response.status).toBe(200);
    });
  });

  test("should return content for options requests", () => {
    expect.assertions(1);
    nock("https://test.dev/wp-json/wc/v3")
      .intercept("/orders", "OPTIONS")
      .reply(200, {
        ok: true
      });

    return api.options("orders", 'wc', {}).then(response => {
      expect(response.status).toBe(200);
    });
  });

  test("should return content for OAuth", () => {
    expect.assertions(1);
    const oAuth = new NorsaniRestApi({
      url: "http://test.dev",
      consumerKey: "ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      consumerSecret: "cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    });

    nock("http://test.dev/wp-json/wc/v3")
      .filteringPath(/\?.*/, "?params")
      .get("/orders?params")
      .reply(200, {
        ok: true
      });

    return oAuth.get("orders", 'wc', {}).then(response => {
      expect(response.status).toBe(200);
    });
  });
});
