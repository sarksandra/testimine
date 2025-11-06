#!/usr/bin/env node
if (require.main === module) {
  const a = process.argv.slice(2);
  if (a[0] === 'hello' && a[1]) { console.log(`Hello, ${a[1]}!`); process.exit(0); }
  console.error('Usage: cli.js hello <name>'); process.exit(1);
}