const prog = require('caporal');
const { version, description } = require('./package.json');

prog
  .version(version)
  .description(description)

  .argument('<file>', 'File with secrets to parse')
  .option('--write', 'Writes output file')
  .option('--output <file>', 'Output file name, if not provided, defaults to <filename>-output.<ext>')
  .action(require('./default'));

prog.parse(process.argv);
