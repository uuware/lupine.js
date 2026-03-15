const copyFolder = require('./cp-folder');

copyFolder('apps/hello-world', 'packages/create-lupine/templates/hello-world');
copyFolder('apps/doc-starter', 'packages/create-lupine/templates/doc-starter');
copyFolder('apps/cv-starter', 'packages/create-lupine/templates/cv-starter');
copyFolder('apps/responsive-starter', 'packages/create-lupine/templates/responsive-starter');
copyFolder('AI_CONTEXT.md', 'packages/create-lupine/templates/common/AI_CONTEXT.md');
copyFolder('dev/dev-watch.js', 'packages/create-lupine/templates/common/dev/dev-watch.js');
copyFolder('dev/cp-folder.js', 'packages/create-lupine/templates/common/dev/cp-folder.js');

// copyFolder('apps/cv-starter', 'dev/github/lupine-template-cv-starter');
copyFolder('AI_CONTEXT.md', 'dev/github/lupine-template-cv-starter/AI_CONTEXT.md');
copyFolder('dev/dev-watch.js', 'dev/github/lupine-template-cv-starter/dev/dev-watch.js');
copyFolder('dev/cp-folder.js', 'dev/github/lupine-template-cv-starter/dev/cp-folder.js');
copyFolder(
  'apps/cv-starter/web/markdown',
  'dev/github/lupine-template-cv-starter/apps/lupine-template-cv-starter/web/markdown'
);

// copyFolder('apps/doc-starter', 'dev/github/lupine-template-doc-starter');
copyFolder('AI_CONTEXT.md', 'dev/github/lupine-template-doc-starter/AI_CONTEXT.md');
copyFolder('dev/dev-watch.js', 'dev/github/lupine-template-doc-starter/dev/dev-watch.js');
copyFolder('dev/cp-folder.js', 'dev/github/lupine-template-doc-starter/dev/cp-folder.js');
copyFolder(
  'apps/doc-starter/web/markdown',
  'dev/github/lupine-template-doc-starter/apps/lupine-template-doc-starter/web/markdown'
);

// lupine-notes-and-tools
copyFolder('AI_CONTEXT.md', 'dev/github/lupine-notes-and-tools/AI_CONTEXT.md');
copyFolder('dev/dev-watch.js', 'dev/github/lupine-notes-and-tools/dev/dev-watch.js');
copyFolder('dev/cp-folder.js', 'dev/github/lupine-notes-and-tools/dev/cp-folder.js');
copyFolder('apps/lupine-notes-and-tools/api', 'dev/github/lupine-notes-and-tools/apps/lupine-notes-and-tools/api');
copyFolder('apps/lupine-notes-and-tools/web', 'dev/github/lupine-notes-and-tools/apps/lupine-notes-and-tools/web');
copyFolder('apps/server', 'dev/github/lupine-notes-and-tools/apps/server');
