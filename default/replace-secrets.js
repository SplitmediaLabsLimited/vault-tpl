const parse = require('./parse');
const { keyBy, get } = require('lodash');

module.exports.replaceSecrets = function(raw, secrets) {
  // keyed the secrets by ID for easy lookup
  const keyedSecrets = keyBy(secrets, 'id');

  const regex = /\(\(\s*vault "(.+):([*.\w]+)@?(\d+)?"\s*\)\)/gm;

  const result = raw.replace(regex, function(x) {
    // parse it again to get the ID
    const id = get(parse(x), [0, 'id']);

    if (id) {
      const secret = get(keyedSecrets, [id, 'secret'], '');

      return secret;
    }

    return '';
  });

  return result;
};
