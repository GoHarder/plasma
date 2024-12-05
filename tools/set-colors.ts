#!/usr/bin/env -S deno run --allow-read

import { parseArgs } from '@std/cli';
import { normalize } from 'node:path';

// MARK: Types
// -------------------------------------------------------------------------

type ColorTokens = {
  primary: ColorTokenSet1;
  secondary: ColorTokenSet1;
  tertiary: ColorTokenSet1;
  neutral: ColorTokenSet2;
  neutralVariant: ColorTokenSet1;
};

type ColorTokenSet1 = {
  '0': string;
  '5': string;
  '10': string;
  '15': string;
  '20': string;
  '25': string;
  '30': string;
  '35': string;
  '40': string;
  '50': string;
  '60': string;
  '70': string;
  '80': string;
  '90': string;
  '95': string;
  '98': string;
  '99': string;
  '100': string;
};

type ColorTokenSet2 = {
  '0': string;
  '4': string;
  '6': string;
  '10': string;
  '12': string;
  '17': string;
  '20': string;
  '22': string;
  '24': string;
  '30': string;
  '40': string;
  '50': string;
  '60': string;
  '70': string;
  '80': string;
  '87': string;
  '90': string;
  '92': string;
  '94': string;
  '95': string;
  '96': string;
  '98': string;
  '99': string;
  '100': string;
};

type MatValue1 = `${keyof Omit<ColorTokens, 'neutral'>}-${keyof ColorTokenSet1}`;
type MatValue2 = `neutral-${keyof ColorTokenSet2}`;

type MatObjTokens = {
  primary: MatValue1;
  onPrimary: MatValue1;
  primaryContainer: MatValue1;
  onPrimaryContainer: MatValue1;
  secondary: MatValue1;
  onSecondary: MatValue1;
  secondaryContainer: MatValue1;
  onSecondaryContainer: MatValue1;
  tertiary: MatValue1;
  onTertiary: MatValue1;
  tertiaryContainer: MatValue1;
  onTertiaryContainer: MatValue1;
  surfaceDim: MatValue2;
  surface: MatValue2;
  surfaceBright: MatValue2;
  surfaceContainerLowest: MatValue2;
  surfaceContainerLow: MatValue2;
  surfaceContainer: MatValue2;
  surfaceContainerHigh: MatValue2;
  surfaceContainerHighest: MatValue2;
  onSurface: MatValue2;
  onSurfaceVariant: MatValue1;
  outline: MatValue1;
  outlineVariant: MatValue1;
  inverseSurface: MatValue2;
  inverseOnSurface: MatValue2;
  inversePrimary: MatValue1;
  background: MatValue2;
  onBackground: MatValue2;
  surfaceTint: MatValue1;
  surfaceVariant: MatValue1;
  primaryFixed: MatValue1;
  primaryFixedDim: MatValue1;
  onPrimaryFixed: MatValue1;
  onPrimaryFixedVariant: MatValue1;
  secondaryFixed: MatValue1;
  secondaryFixedDim: MatValue1;
  onSecondaryFixed: MatValue1;
  onSecondaryFixedVariant: MatValue1;
  tertiaryFixed: MatValue1;
  tertiaryFixedDim: MatValue1;
  onTertiaryFixed: MatValue1;
  onTertiaryFixedVariant: MatValue1;
  scrim: MatValue2;
  shadow: MatValue2;
};

type MatValueTuple<T extends keyof ColorTokens> = [T, keyof ColorTokens[T]];

type ConfigLine = {
  key: string;
  color?: keyof MatObjTokens;
  opacity?: string;
};

type ConfigLines = (ConfigLine | string)[];

// MARK: Constants
// -------------------------------------------------------------------------

const args = parseArgs(Deno.args, {
  alias: {
    config: 'k',
    css: 'c',
    dark: 'd',
  },
  boolean: ['dark', 'css'],
});

const tokenDir = normalize(`${import.meta.dirname}/tokens/`);

// MARK: Helpers
// -------------------------------------------------------------------------

async function getBaseTokens(colors: ColorTokens, light = true) {
  const fileType = light ? 'light' : 'dark';
  const fileData = await Deno.readTextFile(`${tokenDir}/material-${fileType}.json`);
  const fileObj: MatObjTokens = JSON.parse(fileData);

  const update: Partial<Record<keyof MatObjTokens, string>> = {};

  let key: keyof MatObjTokens;
  for (key in fileObj) {
    const color = fileObj[key];
    const [token, num] = color.split('-') as MatValueTuple<keyof ColorTokens>;
    update[key] = colors[token][num];
  }

  return update;
}

async function getConfigTokens(tokens: Awaited<ReturnType<typeof getBaseTokens>>) {
  const fileData = await Deno.readTextFile(`${tokenDir}/k-config.json`);
  const lines: ConfigLines = JSON.parse(fileData);

  for (const line of lines) {
    if (typeof line === 'string') continue;

    let str = line.key;

    if (line.color) str += `=${tokens[line.color]}`;
    if (line.opacity) str += line.opacity;

    console.log(str);
  }
}

// function _getCss(colors: FileData) {
//   const tokens = getBaseTokens(colors);

//   return [
//     { key: '.pri', fill: tokens.primary },
//     { key: '.on-pri', fill: tokens.onPrimary },
//     { key: '.pri-cont', fill: tokens.primaryContainer },
//     { key: '.on-pri-cont', fill: tokens.onPrimaryContainer },

//     { key: '.sec', fill: tokens.secondary },
//     { key: '.sec-cont', fill: tokens.secondaryContainer },
//     { key: '.on-sec-cont', fill: tokens.onSecondaryContainer },

//     { key: '.surf', fill: tokens.surface },

//     { key: '.surf-cont-low', fill: tokens.surfaceContainerLow },
//     { key: '.surf-cont', fill: tokens.surfaceContainer },
//     { key: '.surf-cont-high', fill: tokens.surfaceContainerHigh },
//     { key: '.surf-cont-highest', fill: tokens.surfaceContainerHighest },

//     { key: '.on-surf', fill: tokens.onSurface },
//     { key: '.on-surf-var', fill: tokens.onSurfaceVariant },

//     { key: '.outline', fill: tokens.outline },
//     { key: '.outline-var', fill: tokens.outlineVariant },

//     { key: '.inv-surf', fill: tokens.inverseSurface },
//     { key: '.on-inv-surf', fill: tokens.inverseOnSurface },

//     { key: '.surf-var', fill: tokens.surfaceVariant },

//     { key: '.disabled-back', fill: tokens.onSurface, opacity: '0.12' },
//     { key: '.disabled-text', fill: tokens.onSurface, opacity: '0.38' },
//   ];
// }

// MARK: Constants
// -------------------------------------------------------------------------

// MARK: Main
// -------------------------------------------------------------------------

async function main() {
  const light = !args.dark;
  const colorPath = `${import.meta.dirname}/colors.json`;
  const fileData = await Deno.readTextFile(colorPath);
  const fileObj: ColorTokens = JSON.parse(fileData);

  const baseTokens = await getBaseTokens(fileObj, light);

  if (args.config) {
    await getConfigTokens(baseTokens);
    return;
  }

  if (args.css) {
    console.log('go fuck yourself');
    return;
  }

  console.log(baseTokens);
}

main();
