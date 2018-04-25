import { makeRoute } from './transformers'
import { BaseAdapter as Adapter } from './adapter'
import { methods, isString } from './misc';

export const omnicFactory = (...stuff) => {
  var adapter = new Adapter();     // default fetch adapter here
  var interceptor = null;         // default interceptor here
  var config = {};               // default global route config here

  if (stuff) {
    stuff.forEach(element => {
      const type = typeof element;

      if (type === 'function') {
        interceptor = element;
      } else if (type === 'object' && typeof Adapter !== 'undefined' && element instanceof Adapter) {
        adapter = element;
      } else if (type === 'object') {
        config = element;
      } else if (type === 'string') {
        config = { path: element };
      } else {
        console.error('Warning! Wrong config for route:', element);
      }
    });
  }

  const bound = makeRoute.bind({
    config,
    adapter,
    interceptor
  });

  bound.with = omnicFactory;

  return bound;
}

/**
 * @type { { [K in OmnicMethods]: Function } }
 */
const aliases = {}
methods.forEach(method => {
  aliases[method] = config => {
    console.log(config)
    if (isString(config)) config = { path: config }
    else if (!config) config = {}

    config.method = method
    return omnicFactory()(config)
  }
})

export { aliases }
