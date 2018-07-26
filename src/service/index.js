/**
 * =============================================================================
 *  Service
 * =============================================================================
 *
 * @author dondevi
 * @create 2018-02-05
 *
 * @todo 2018-06-12 dondevi
 *   1.Add: `cache/`
 *
 * @update 2018-02-09 dondevi
 */

import URLS from "./urls/index.js";
import REQUEST from "./request/index.js";

/**
 * 生成 service
 * @return {Object}
 */
function factoryService () {
  const service = {};
  for (let type in URLS) {
    service[type] = service[type] || {};
    for (let key in URLS[type]) {
      service[type][key] = REQUEST[type].bind(undefined, URLS[type][key]);
    }
  }
  return service;
}

export default factoryService();
