// @ts-check

const { readFile: rF, writeFile: wF } = require('node:fs/promises');

/**
 * @import { FileHandle} from 'node:fs/promises'
 * @import { PathLike } from 'node:fs'
 */

const args = process.argv.slice(2);

const filePath = args[0];

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

  update = update.replace(/id="(path|circle|rect|group)[\d-]+"/g, '');

  await writeFile(filePath, update);
}

main();
