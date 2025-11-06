const { execFileSync, spawnSync } = require('child_process');
const path = require('path');
const assert = require('assert');

const cliPath = path.resolve(__dirname, '../src/cli.js');

(() => {
  const result = spawnSync('node', [cliPath, 'hello', 'Mihkel'], {
    encoding: 'utf-8'
  });

  assert.strictEqual(result.status, 0, 'Exit code should be 0');
  assert.ok(result.stdout.includes('Hello, Mihkel!'), 'Should greet Mihkel');
  assert.strictEqual(result.stderr, '', 'stderr should be empty');
})();

(() => {
  const result = spawnSync('node', [cliPath], {
    encoding: 'utf-8'
  });

  assert.notStrictEqual(result.status, 0, 'Exit code should be non-zero');
  assert.ok(result.stderr.includes('Usage: cli.js hello <name>'), 'Should print usage to stderr');
})();
