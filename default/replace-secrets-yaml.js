const parse = require('./parse');
const { keyBy, get } = require('lodash');

module.exports.replaceSecretsYaml = function(object, secrets) {
  const keyedSecrets = keyBy(secrets, 'id');

  Object.keys(object).map(key => {
    const id = get(parse(object[key]), [0, 'id']);

    if (!id) {
      return;
    }

    const secret = get(keyedSecrets, [id, 'secret'], '');
    object[key] = secret;
  });

  return object;
};
