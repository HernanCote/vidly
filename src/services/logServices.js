import Raven from "raven-js";
import { ravenUrl } from "../config.json";

function init() {
  const options = { release: "1.0.0", environment: "development-test" };
  Raven.config(ravenUrl, options).install();
}

function log(error) {
  Raven.captureException(error);
}

export default {
  init,
  log
};
