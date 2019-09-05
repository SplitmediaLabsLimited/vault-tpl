module.exports = function parse(content) {
  const regex = /\(\(\s*vault "(.+):([*.\w]+)@?(\d+)?"\s*\)\)/gm;
  let m;
  const output = [];

  while ((m = regex.exec(content)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    const [, secret, field, version] = m;
    const id = `${secret}:${field}@${version}`;
    output.push({ id, secret, field, version });
  }

  const uniqBy = require('lodash/uniqBy');

  return uniqBy(output, 'id');
};
