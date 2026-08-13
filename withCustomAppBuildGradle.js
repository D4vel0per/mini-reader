const { withAppBuildGradle } = require('expo/config-plugins');

function insert (oldText, pattern, newText) {
    const pivot = oldText.indexOf(pattern) + pattern.length + 1
    return oldText.slice(0, pivot) + newText + oldText.slice(pivot)
}

module.exports = function withCustomAppBuildGradle(config) {
 return withAppBuildGradle(config, async (config) => {
   const androidPattern = '\nandroid {\n';
   const dependenciesPattern = '\ndependencies {\n';
   const androidText = '   compileOptions {\n        coreLibraryDesugaringEnabled true\n    }\n\n '
   const dependenciesText = '   coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:2.1.2")\n\n '
   let { contents } = config.modResults

   contents = insert(contents, androidPattern, androidText)
   contents = insert(contents, dependenciesPattern, dependenciesText)

   config.modResults.contents = contents

   return config;
 });
};