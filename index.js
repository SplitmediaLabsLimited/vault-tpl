const prog = require('commander');

prog
  .option('--write', 'Writes output file')
  .option('--output <file>', 'Output file name, if not provided, defaults to <filename>-output.<ext>')
  .argument('<file>', 'File with secrets to parse')
  .action(require('./default'));

prog.parse();
