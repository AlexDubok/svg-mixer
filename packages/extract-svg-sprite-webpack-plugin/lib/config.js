const fs = require('fs');

const mixer = require('svg-mixer');

/**
 * @typedef {Object} ExtractSvgSpritePluginConfig
 * @property {string|function(path, query)} symbolId='[name]'
 * @property {string|function(path, query)} filename='sprite.svg'
 * @property {boolean} emit=true
 * @property {string} publicPath
 * @property {string[]} runtimeFields
 * @property {string} selector=null
 * @property {string} spriteType 'classic' | 'stack'
 * @property {mixer.Sprite} spriteClass
 * @property {mixer.SpriteSymbol} symbolClass
 */

module.exports = {
  CSS_LOADER_PATH: require.resolve('./css-loader'),
  LOADER_PATH: require.resolve('./loader'),
  NAMESPACE: fs.realpathSync(__dirname),
  GHOST_SPRITE_FILENAME: '*',
  TOKENS: {
    CHUNK_NAME: /(\[name])/ig,
    CHUNK_HASH: /(\[(?:(\w+):)?chunkhash(?::([a-z]+\d*))?(?::(\d+))?\])/ig,
    COMPILATION_HASH: /(\[(?:(\w+):)?hash(?::([a-z]+\d*))?(?::(\d+))?\])/ig,
    SPRITE_HASH: /(\[(?:(\w+):)?contenthash(?::([a-z]+\d*))?(?::(\d+))?\])/ig
  },

  /**
   * @return {ExtractSvgSpritePluginConfig}
   */
  plugin: {
    emit: true,
    filename: 'sprite.svg',
    publicPath: undefined,
    runtimeFields: [
      'id',
      'width',
      'height',
      'viewBox',
      'url',
      'toString'
    ],
    selector: undefined,
    spriteClass: mixer.Sprite,
    spriteConfig: undefined,
    spriteType: mixer.Sprite.TYPE,
    symbolClass: mixer.SpriteSymbol,
    symbolId: '[name]'
  }
};
