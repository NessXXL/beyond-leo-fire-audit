import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const evidence = JSON.parse(readFileSync(new URL('../evidence.json', import.meta.url), 'utf8'));

// Locate the engine block: the <script> that assigns root.AUDIT. It must be unique.
const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map((m) => m[1])
  .filter((code) => /root\.AUDIT\s*=/.test(code));
assert.equal(blocks.length, 1, 'expected exactly one engine <script> block defining root.AUDIT');

const sandbox = { window: {} };
vm.runInNewContext(blocks[0], sandbox, { filename: 'index.html[engine]' });
const A = sandbox.window.AUDIT;

const STATUSES = ['holds', 'weakens', 'breaks', 'unknown'];

test('window.AUDIT exists with 10 rows and the expected environments', () => {
  assert.ok(A, 'window.AUDIT is defined');
  assert.equal(A.ROWS.length, 10);
  assert.deepEqual([...A.ENVS.map((e) => e.id)], ['iss', 'orion', 'lander', 'rover', 'mars']);
});

test('verdict is holds/weakens/breaks/unknown for every row x environment', () => {
  for (const env of A.ENVS) {
    for (const row of A.ROWS) {
      const v = A.evaluate(row.id, env);
      assert.ok(STATUSES.includes(v.status), `${row.id} x ${env.id} -> ${v.status}`);
    }
  }
});

test('evidence references existing sources, rows and investigations', () => {
  const rowIds = new Set(A.ROWS.map((r) => r.id));
  assert.ok(A.EVIDENCE.length > 0);
  for (const ev of A.EVIDENCE) {
    assert.ok(A.SOURCES[ev.src], `evidence ${ev.id}: unknown source "${ev.src}"`);
    assert.ok(rowIds.has(ev.row), `evidence ${ev.id}: unknown row "${ev.row}"`);
    if (ev.inv) assert.ok(A.INV[ev.inv], `evidence ${ev.id}: unknown investigation "${ev.inv}"`);
  }
});

test('exportData() matches evidence.json', () => {
  const exported = JSON.parse(JSON.stringify(A.exportData()));
  assert.deepEqual(exported, evidence);
});