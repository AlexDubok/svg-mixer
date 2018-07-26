const mixer = require('svg-mixer');
const { getHashDigest } = require('loader-utils');

const { NAMESPACE } = require('../config');

const TOKEN_START = '___';
const TOKEN_END = '___';

const Replacements = {
  PUBLIC_PATH: 'public_path',
  SPRITE_FILENAME: 'sprite_filename',
  SYMBOL_BG_POSITION_LEFT: 'symbol_bg_position_left',
  SYMBOL_BG_POSITION_TOP: 'symbol_bg_position_top',
  SYMBOL_BG_SIZE_WIDTH: 'symbol_bg_size_width',
  SYMBOL_BG_SIZE_HEIGHT: 'symbol_bg_size_height'
};

/**
 * @param {string} id
 * @return {string}
 */
function generateToken(id) {
  const value = [
    NAMESPACE,
    id
  ].filter(Boolean).join('');

  return `${TOKEN_START}${getHashDigest(value)}${TOKEN_END}`;
}

class Replacement {
  constructor(token, replaceTo) {
    this.value = generateToken(token);
    this.replaceTo = replaceTo;
  }
}

class ReplacementGenerator {
  /**
   * @param {SpriteSymbol} symbol
   * @param {Object} config
   * @param {string} config.filename
   * @param {boolean} config.emit
   * @param {string} config.spriteType
   * @return {Replacement}
   */
  static symbolUrl(symbol, config) {
    const { filename, emit, spriteType } = config;
    let replaceTo;

    if (!filename || !emit) {
      replaceTo = `#${symbol.id}`;
    } else {
      replaceTo = spriteType === mixer.StackSprite.TYPE
        ? `${filename}#${symbol.id}`
        : filename;
    }

    return new Replacement(
      `${Replacements.SPRITE_FILENAME}:${symbol.request}`,
      replaceTo
    );
  }

  static bgPosLeft(symbolUrl, position) {
    return new Replacement(
      `${Replacements.SYMBOL_BG_POSITION_LEFT}:${symbolUrl}`,
      position ? position.bgPosition.left : undefined
    );
  }

  static bgPosTop(symbolUrl, position) {
    return new Replacement(
      `${Replacements.SYMBOL_BG_POSITION_TOP}:${symbolUrl}`,
      position ? position.bgPosition.top : undefined
    );
  }

  static bgSizeWidth(symbolUrl, position) {
    return new Replacement(
      `${Replacements.SYMBOL_BG_SIZE_WIDTH}:${symbolUrl}`,
      position ? position.bgSize.width : undefined
    );
  }

  static bgSizeHeight(symbolUrl, position) {
    return new Replacement(
      `${Replacements.SYMBOL_BG_SIZE_HEIGHT}:${symbolUrl}`,
      position ? position.bgSize.height : undefined
    );
  }

  static publicPath(url, path) {
    return new Replacement(`${Replacements.PUBLIC_PATH}:${url}`, path);
  }
}

module.exports = ReplacementGenerator;
module.exports.Replacement = Replacement;
module.exports.generateToken = generateToken;
module.exports.Replacements = Replacements;
