'use strict';
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

exports.default = function (context) {
  console.warn('after pack hook.');
  if (context.packager.platform.name !== 'linux') {
    return;
  }

  console.warn('after pack; disable sandbox for linux');
  const exeName = context.packager.executableName;
  const scriptPath = path.join(context.appOutDir, exeName);
  cp.execFileSync('mv', [scriptPath, scriptPath + '.bin']);
  fs.writeFileSync(
    scriptPath,
    `#!/bin/bash
script_dir="$(dirname "$(readlink -f "\${BASH_SOURCE[0]}")")"
"\${script_dir}"/${exeName}.bin "$@" --no-sandbox
`
  );
  cp.execFileSync('chmod', ['+x', scriptPath]);
};
