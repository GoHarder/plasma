// @ts-check

const { readFile: rF, writeFile: wF } = require('node:fs/promises');

/**
 * @import { FileHandle} from 'node:fs/promises'
 * @import { PathLike } from 'node:fs'
 */

const args = process.argv.slice(2);

const filePath = args[0];

const extras = [
  /id="(use|path|circle|rect|group|defs|style|svg|namedview|stop)[\d-]+"/g,
  /(inkscape|sodipodi):.+=".+"/g,
  /(xmlns:sodipodi|xmlns:inkscape)=".+"/g,
  '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n',
];

/** @param {PathLike | FileHandle} path */
async function readFile(path) {
  try {
    return await rF(path, 'utf8');
  } catch (error) {
    console.error(error);
    return '';
  }
}

/**
 * @param {PathLike | FileHandle} path
 * @param {string} data
 */
async function writeFile(path, data) {
  try {
    return await wF(path, data, 'utf8');
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  const fileData = await readFile(filePath);

  const target = /\d+\.\d{4,}/g;

  let update = fileData.replace(target, (match) => {
    const matchFloat = parseFloat(match);

    const rounded = Math.round(matchFloat * 1000) / 1000;

    return rounded.toString();
  });

  extras.forEach((target) => {
    update = update.replace(target, '');
  });

  // update = update.replace(/id="(use|path|circle|rect|group|defs|style)[\d-]+"/g, '');
  // update = update.replace('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n', '');
  await writeFile(filePath, update);
}

main();
