import { getQueryString } from '../misc'
import 'whatwg-fetch'

export class RequestAdapter {
  request (url, config) {
    [url, config] = this.processParams(url, config)
    console.log(url)
    return fetch(url, config)
  }

  processParams (url, config) {
    if (config.params) {
      let query = getQueryString(config.params).strip()

      if (query) {
        url = url + (~url.indexOf('?') ? '&' : '?') + query
      }
    }

    return [url, config]
  }
}
