// packages/expo/plugins/withKotlinxDatetime/index.js
const { withAppBuildGradle } = require('@expo/config-plugins')
const {
  mergeContents,
} = require('@expo/config-plugins/build/utils/generateCode')

// old enforced version, discarded--see final updates section for more info
// const DEFAULT_DATETIME_VERSION = '0.6.1'
// new enforced version with max compatibility
const DEFAULT_DATETIME_VERSION = '0.7.1-0.6.x-compat'
const DEFAULT_REASON =
  'Sourcepoint RN CMP expects the classic packaging; 0.7.x pulls -jvm and can break runtime'

module.exports = function withKotlinxDatetime(config, props = {}) {
  return withAppBuildGradle(config, cfg => {
    const version = props.datetimeVersion ?? DEFAULT_DATETIME_VERSION
    const reason = props.reason ?? DEFAULT_REASON

    // 1) plain dep (no version)
    let result = mergeContents({
      tag: 'kotlinx-datetime-impl',
      src: cfg.modResults.contents,
      newSrc: `implementation("org.jetbrains.kotlinx:kotlinx-datetime")`,
      anchor: /^\s*dependencies\s*\{/m,
      offset: 1,
      comment: '//',
    })
    if (!result.didMerge) {
      throw new Error(
        'Could not add kotlinx-datetime implementation; missing `dependencies {}`.',
      )
    }
    cfg.modResults.contents = result.contents

    // 2) strict constraint (+ because)
    const constraintBlock = [
      `constraints {`,
      `  implementation("org.jetbrains.kotlinx:kotlinx-datetime:${version}") {`,
      `    version { strictly "${version}" }`,
      `    because("${reason}")`,
      `  }`,
      `}`,
    ].join('\n')

    result = mergeContents({
      tag: 'kotlinx-datetime-constraint-strict',
      src: cfg.modResults.contents,
      newSrc: constraintBlock,
      anchor: /^\s*dependencies\s*\{/m,
      offset: 1,
      comment: '//',
    })
    if (!result.didMerge) {
      throw new Error(
        'Could not add kotlinx-datetime constraint; missing `dependencies {}`.',
      )
    }
    cfg.modResults.contents = result.contents

    return cfg
  })
}
