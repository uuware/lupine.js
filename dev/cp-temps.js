const copyFolder = require('./cp-folder');

copyFolder('apps/hello-world', 'packages/create-lupine/templates/hello-world');
copyFolder('apps/doc-starter', 'packages/create-lupine/templates/doc-starter');
copyFolder('apps/cv-starter', 'packages/create-lupine/templates/cv-starter');

copyFolder('AI_CONTEXT.md', 'packages/create-lupine/templates/common/AI_CONTEXT.md');
// copyFolder('apps/note-starter', 'packages/create-lupine/templates/note-starter');
