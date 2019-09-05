const parse = require('./parse');

test('empty string', () => {
  expect(parse(``)).toMatchSnapshot();
});

test('no secrets', () => {
  expect(parse(`hello world`)).toMatchSnapshot();
});

test('1 secret', () => {
  const content = `
  secret: (( vault "version-test:secret@2" ))
  secret2: (( vault "version-test:secret2@3" ))
  secret3: "raw"
  `;
  expect(parse(content)).toMatchSnapshot();
});

test('multiple secrets', () => {
  const content = `
  secret: (( vault "version-test:secret@2" ))
  secret2: (( vault "version-test:secret2@3" ))
  secret3: "raw"
  `;
  expect(parse(content)).toMatchSnapshot();
});

test('multiple and duplicate secrets, should deduplicate', () => {
  const content = `
  secret: (( vault "version-test:secret@2" ))
  secret: (( vault "version-test:secret@2" ))
  secret: (( vault "version-test:secret@2" ))
  secret2: (( vault "version-test:secret2@3" ))
  secret3: "raw"
  `;
  expect(parse(content)).toMatchSnapshot();
});

test('no spaces', () => {
  const content = `
  secret: ((vault "version-test:secret@2"))
  secret: ((vault "version-test:secret@2"))
  secret: ((vault "version-test:secret@2"))
  secret2: ((vault "version-test:secret2@3"))
  secret3: "raw"
  `;
  expect(parse(content)).toMatchSnapshot();
});
