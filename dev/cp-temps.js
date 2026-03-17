const copyFolder = require('./cp-folder');

copyFolder('AI_CONTEXT.md', 'packages/create-lupine/templates/common/AI_CONTEXT.md');
copyFolder('dev/dev-watch.js', 'packages/create-lupine/templates/common/dev/dev-watch.js');
copyFolder('dev/cp-folder.js', 'packages/create-lupine/templates/common/dev/cp-folder.js');
copyFolder('apps/lupine-template-cv-starter', 'packages/create-lupine/templates/lupine-template-cv-starter');
copyFolder('apps/lupine-template-doc-starter', 'packages/create-lupine/templates/lupine-template-doc-starter');
copyFolder('apps/lupine-template-hello-world', 'packages/create-lupine/templates/lupine-template-hello-world');
copyFolder(
  'apps/lupine-template-responsive-starter',
  'packages/create-lupine/templates/lupine-template-responsive-starter'
);
copyFolder('apps/server', 'packages/create-lupine/templates/common/apps/server');

// lupine-template-cv-starter
copyFolder('AI_CONTEXT.md', 'dev/github/lupine-template-cv-starter/AI_CONTEXT.md');
copyFolder('dev/dev-watch.js', 'dev/github/lupine-template-cv-starter/dev/dev-watch.js');
copyFolder('dev/cp-folder.js', 'dev/github/lupine-template-cv-starter/dev/cp-folder.js');
copyFolder(
  'apps/cv-starter/web/markdown',
  'dev/github/lupine-template-cv-starter/apps/lupine-template-cv-starter/web/markdown'
);
copyFolder('apps/lupine-template-cv-starter', 'dev/github/lupine-template-cv-starter/apps/lupine-template-cv-starter');

// lupine-template-doc-starter
copyFolder('AI_CONTEXT.md', 'dev/github/lupine-template-doc-starter/AI_CONTEXT.md');
copyFolder('dev/dev-watch.js', 'dev/github/lupine-template-doc-starter/dev/dev-watch.js');
copyFolder('dev/cp-folder.js', 'dev/github/lupine-template-doc-starter/dev/cp-folder.js');
copyFolder(
  'apps/cv-starter/web/markdown',
  'dev/github/lupine-template-doc-starter/apps/lupine-template-doc-starter/web/markdown'
);
copyFolder(
  'apps/lupine-template-doc-starter',
  'dev/github/lupine-template-doc-starter/apps/lupine-template-doc-starter'
);

// lupine-template-responsive-starter
copyFolder('AI_CONTEXT.md', 'dev/github/lupine-template-responsive-starter/AI_CONTEXT.md');
copyFolder('dev/dev-watch.js', 'dev/github/lupine-template-responsive-starter/dev/dev-watch.js');
copyFolder('dev/cp-folder.js', 'dev/github/lupine-template-responsive-starter/dev/cp-folder.js');
copyFolder(
  'apps/lupine-template-responsive-starter',
  'dev/github/lupine-template-responsive-starter/apps/lupine-template-responsive-starter'
);
