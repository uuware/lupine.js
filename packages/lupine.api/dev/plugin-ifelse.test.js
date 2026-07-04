import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';

// Use createRequire to import the CommonJS module in an ESM environment
const require = createRequire(import.meta.url);
const plugin = require('./plugin-ifelse.js');
const { processOneFile } = plugin._test;

async function runTestCode(vars, code) {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ifelse-test-'));
  const fpath = path.join(tmpDir, 'test.js');
  await fs.writeFile(fpath, code, 'utf8');
  const result = await processOneFile(vars, fpath);
  await fs.rm(tmpDir, { recursive: true, force: true });
  return result;
}

test('Plugin If-Else Compilation', async (t) => {
  
  await t.test('1. Basic //#if (no spaces)', async () => {
    const code = `
//#if MOBILE
console.log('is mobile');
//#endif
    `;
    
    let res = await runTestCode({ MOBILE: '1' }, code);
    assert.match(res, /is mobile/, "Should keep code when MOBILE is '1'");

    res = await runTestCode({ MOBILE: '' }, code);
    assert.doesNotMatch(res, /is mobile/, "Should remove code when MOBILE is ''");

    res = await runTestCode({}, code);
    assert.doesNotMatch(res, /is mobile/, "Should remove code when MOBILE is undefined");
  });

  await t.test('2. Spaces inside comment //   #if   xxx', async () => {
    const code = `
//   #if   MOBILE
console.log('is mobile');
//   #endif
    `;
    
    let res = await runTestCode({ MOBILE: '1' }, code);
    assert.match(res, /is mobile/, "Should keep code when MOBILE is '1'");

    res = await runTestCode({ MOBILE: '' }, code);
    assert.doesNotMatch(res, /is mobile/, "Should remove code when MOBILE is ''");
  });

  await t.test('3. Indented comment    //#if xxx', async () => {
    const code = `
function test() {
    //#if MOBILE
    console.log('is mobile');
    //#endif
}
    `;
    
    let res = await runTestCode({ MOBILE: '1' }, code);
    assert.match(res, /is mobile/, "Should keep code when MOBILE is '1'");

    res = await runTestCode({ MOBILE: '' }, code);
    assert.doesNotMatch(res, /is mobile/, "Should remove code when MOBILE is ''");
  });

  await t.test('4. Negative condition !xxx when undefined', async () => {
    const code = `
//#if !MOBILE
console.log('is not mobile');
//#endif
    `;
    
    // If MOBILE is not defined, !MOBILE evaluates to true
    let res = await runTestCode({}, code);
    assert.match(res, /is not mobile/, "Should keep code when MOBILE is undefined and using !MOBILE");

    // If MOBILE is '1', !MOBILE evaluates to false
    res = await runTestCode({ MOBILE: '1' }, code);
    assert.doesNotMatch(res, /is not mobile/, "Should remove code when MOBILE is '1' and using !MOBILE");
  });
});

