import { getQueryString } from '../src/misc'

class RequestAdapter {
  processParams (url, config) {
    if (config.params) {
      let query = getQueryString(config.params).strip()
    }

    if (query) {
      url = url + (~url.indexOf('?') ? '&' : '?') + query
    }

    return [url, config]
  }
}
