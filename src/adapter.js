import { getQueryString } from './misc/index'
/**
 * @extends { Adapter }
 * @type { Adapter }
 * @export
 */
export default class {
  request (url, config) {
    [url, config] = this.processParams(url, config)
    console.log(url)
    return fetch(url, config)
  }

  processParams (url, config) {
    if (config.params) {
      let query = getQueryString(config.params).trim()

      if (query) {
        url = url + (~url.indexOf('?') ? '&' : '?') + query
      }
    }

    return [url, config]
  }
}
