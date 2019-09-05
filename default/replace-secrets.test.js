const parse = require('./parse');
const { replaceSecrets } = require('./replace-secrets');

test('multiple and duplicate secrets, should deduplicate', () => {
  const content = `
  secret: (( vault "version-test:secret@2" ))
  secret: (( vault "version-test:secret@2" ))
  secret: (( vault "version-test:secret@2" ))
  secret2: (( vault "version-test:secret2@3" ))
  secret3: "raw"
  `;

  const matches = parse(content);
  const secrets = matches.map((match, index) => ({
    ...match,
    secret: `secret values goes here ${index}`,
  }));

  const replaced = replaceSecrets(content, secrets);

  expect(replaced).toMatchSnapshot();
});

test('no secrets found', () => {
  const content = `
  secret: (( vault "version-test:secret@2" ))
  secret: (( vault "version-test:secret@2" ))
  secret: (( vault "version-test:secret@2" ))
  secret2: (( vault "version-test:secret2@3" ))
  secret3: "raw"
  `;

  const matches = parse(content);
  const secrets = matches.map((match, index) => ({
    ...match,
    secret: undefined,
  }));

  const replaced = replaceSecrets(content, secrets);

  expect(replaced).toMatchSnapshot();
});
