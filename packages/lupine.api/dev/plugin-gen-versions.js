const fs = require('fs/promises');

module.exports = (
  packageDependencies,
  outputFilename,
) => {
  return {
    name: 'gen-versions',
    setup(build) {
      build.onStart(async () => {
        const content = `export const LUPINE_WEB_VERSION = "${packageDependencies['lupine.web']}";
export const LUPINE_COMPONENTS_VERSION = "${packageDependencies['lupine.components']}";
export const LUPINE_API_VERSION = "${packageDependencies['lupine.api']}";
`;
        await fs.writeFile(outputFilename, content);
        console.log(`Generated ${outputFilename}`);
      });
    },
  };
};
