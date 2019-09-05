const path = require('path');
const fs = require('fs');
const YAML = require('js-yaml');

function getOutput({ name, ext }, output) {
  if (output) {
    return output;
  }

  return `${name}-output${ext}`;
}

async function readFile(file) {
  return fs.readFileSync(file, 'utf8');
}

async function writeOutput(filename, data, { write }) {
  if (!write) {
    console.log(data);
    return;
  }

  fs.writeFileSync(filename, data);
}

async function writeOutputYaml(filename, data, { write }) {
  const output = YAML.safeDump(data, {
    lineWidth: 200,
  });

  if (!write) {
    console.log(output);
    return;
  }

  fs.writeFileSync(filename, output);
}

module.exports = async function(args, options) {
  await require('../utils/validate')();
  const parse = require('./parse');
  const { fetchSecrets } = require('./fetch-secrets');
  const { replaceSecrets } = require('./replace-secrets');
  const { replaceSecretsYaml } = require('./replace-secrets-yaml');

  const { file } = args;
  const { write } = options;
  const { name, ext } = path.parse(file);
  const outputFilename = getOutput({ name, ext }, options.output);
  const raw = await readFile(file);
  const matches = parse(raw);
  const secrets = await fetchSecrets(matches);

  if (ext === '.yaml' || ext === '.yml') {
    const parsed = YAML.safeLoad(raw);
    const output = replaceSecretsYaml(parsed, secrets);
    await writeOutputYaml(outputFilename, output, {
      write,
    });
  } else {
    const output = replaceSecrets(raw, secrets);

    await writeOutput(outputFilename, output, {
      write,
    });
  }
};
