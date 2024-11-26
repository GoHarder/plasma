#!/usr/bin/env -S deno run --allow-read

// MARK: Types
// -------------------------------------------------------------------------

type BaseColorRange = {
  _0: string;
  _5: string;
  _10: string;
  _15: string;
  _20: string;
  _25: string;
  _30: string;
  _35: string;
  _40: string;
  _50: string;
  _60: string;
  _70: string;
  _80: string;
  _90: string;
  _95: string;
  _98: string;
  _99: string;
  _100: string;
};

type ExtendedColorRange = {
  _0: string;
  _4: string;
  _6: string;
  _10: string;
  _12: string;
  _17: string;
  _20: string;
  _22: string;
  _24: string;
  _30: string;
  _40: string;
  _50: string;
  _60: string;
  _70: string;
  _80: string;
  _87: string;
  _90: string;
  _92: string;
  _94: string;
  _95: string;
  _96: string;
  _98: string;
  _99: string;
  _100: string;
};

type FileData = {
  primary: BaseColorRange;
  secondary: BaseColorRange;
  tertiary: BaseColorRange;
  neutral: ExtendedColorRange;
  neutralVariant: BaseColorRange;
};

// MARK: Helpers
// -------------------------------------------------------------------------

function getBaseTokens(colors: FileData, light = true) {
  const { primary, secondary, tertiary, neutral, neutralVariant } = colors;

  return {
    primary: light ? primary._40 : primary._80,
    onPrimary: light ? primary._100 : primary._20,
    primaryContainer: light ? primary._30 : primary._90,
    onPrimaryContainer: light ? primary._90 : primary._10,
    secondary: light ? secondary._40 : secondary._80,
    onSecondary: light ? secondary._100 : secondary._20,
    secondaryContainer: light ? secondary._30 : secondary._90,
    onSecondaryContainer: light ? secondary._90 : secondary._10,
    tertiary: light ? tertiary._40 : tertiary._80,
    onTertiary: light ? tertiary._100 : tertiary._20,
    tertiaryContainer: light ? tertiary._30 : tertiary._90,
    onTertiaryContainer: light ? tertiary._90 : tertiary._10,
    surfaceDim: light ? neutral._87 : neutral._6,
    surface: light ? neutral._98 : neutral._6,
    surfaceBright: light ? neutral._98 : neutral._24,
    surfaceContainerLowest: light ? neutral._100 : neutral._4,
    surfaceContainerLow: light ? neutral._96 : neutral._10,
    surfaceContainer: light ? neutral._94 : neutral._12,
    surfaceContainerHigh: light ? neutral._92 : neutral._17,
    surfaceContainerHighest: light ? neutral._90 : neutral._22,
    onSurface: light ? neutral._10 : neutral._90,
    onSurfaceVariant: light ? neutralVariant._30 : neutralVariant._80,
    outline: light ? neutralVariant._50 : neutralVariant._60,
    outlineVariant: light ? neutralVariant._80 : neutralVariant._30,
    inverseSurface: light ? neutral._20 : neutral._90,
    inverseOnSurface: light ? neutral._95 : neutral._20,
    surfaceVariant: light ? neutralVariant._90 : neutralVariant._30,
  };
}

function getConfigTokens(colors: FileData) {
  const tokens = getBaseTokens(colors);

  return [
    { key: '# window', color: '' },
    { key: 'window.color', color: tokens.surfaceContainerHigh },
    { key: 'inactive.window.color', color: tokens.surfaceContainer },
    { key: 'window.text.color', color: tokens.onSurface },
    { key: 'inactive.window.text.color', color: tokens.onSurfaceVariant },

    { key: '# base', color: '' },
    { key: 'base.color', color: tokens.surfaceContainer },
    { key: 'alt.base.color', color: tokens.surfaceContainerLow },
    { key: '; inactive.base.color', color: '' },
    { key: '; inactive.alt.base.color', color: '' },
    { key: 'text.color', color: tokens.onSurface },
    { key: 'inactive.text.color', color: tokens.onSurfaceVariant },
    { key: 'disabled.text.color', color: `${tokens.onSurface}61` },

    { key: '# highlight', color: '' },
    { key: 'highlight.color', color: tokens.secondaryContainer },
    { key: 'inactive.highlight.color', color: `${tokens.secondaryContainer}bf` },
    { key: 'highlight.text.color', color: tokens.onSecondaryContainer },
    { key: 'inactive.highlight.text.color', color: tokens.onSurfaceVariant },

    { key: '# tooltip', color: '' },
    { key: 'tooltip.base.color', color: tokens.surfaceContainer },
    { key: 'tooltip.text.color', color: tokens.onSurfaceVariant },

    { key: '# button', color: '' },
    { key: 'button.color', color: tokens.secondaryContainer },
    { key: 'button.text.color', color: tokens.onSecondaryContainer },

    { key: '# general', color: '' },
    { key: 'light.color', color: tokens.outline },
    { key: 'mid.color', color: tokens.surfaceVariant },
    { key: 'mid.light.color', color: tokens.outlineVariant },
    { key: 'dark.color', color: tokens.surface },

    { key: '# [PanelButtonCommand]', color: '' },
    { key: 'text.normal.color', color: tokens.onSecondaryContainer },
    { key: 'text.focus.color', color: tokens.onSecondaryContainer },
    { key: 'text.press.color', color: tokens.onSecondaryContainer },
    { key: 'text.toggle.color', color: tokens.onSurfaceVariant },

    { key: '# [ToolbarButton]', color: '' },
    { key: 'text.normal.color', color: tokens.primary },
    { key: 'text.focus.color', color: tokens.primary },
    { key: 'text.press.color', color: tokens.primary },
    { key: 'text.toggle.color', color: tokens.onSecondaryContainer },
  ];
}

function _getCss(colors: FileData) {
  const tokens = getBaseTokens(colors);

  return [
    { key: '.pri', fill: tokens.primary },
    { key: '.on-pri', fill: tokens.onPrimary },
    { key: '.pri-cont', fill: tokens.primaryContainer },
    { key: '.on-pri-cont', fill: tokens.onPrimaryContainer },

    { key: '.sec', fill: tokens.secondary },
    { key: '.sec-cont', fill: tokens.secondaryContainer },
    { key: '.on-sec-cont', fill: tokens.onSecondaryContainer },

    { key: '.surf', fill: tokens.surface },

    { key: '.surf-cont-low', fill: tokens.surfaceContainerLow },
    { key: '.surf-cont', fill: tokens.surfaceContainer },
    { key: '.surf-cont-high', fill: tokens.surfaceContainerHigh },
    { key: '.surf-cont-highest', fill: tokens.surfaceContainerHighest },

    { key: '.on-surf', fill: tokens.onSurface },
    { key: '.on-surf-var', fill: tokens.onSurfaceVariant },

    { key: '.outline', fill: tokens.outline },
    { key: '.outline-var', fill: tokens.outlineVariant },

    { key: '.inv-surf', fill: tokens.inverseSurface },
    { key: '.on-inv-surf', fill: tokens.inverseOnSurface },

    { key: '.surf-var', fill: tokens.surfaceVariant },

    { key: '.disabled-back', fill: tokens.onSurface, opacity: '0.12' },
    { key: '.disabled-text', fill: tokens.onSurface, opacity: '0.38' },
  ];
}

// MARK: Main
// -------------------------------------------------------------------------

async function main() {
  const fileData = await Deno.readTextFile('colors.json');
  const fileObj: FileData = JSON.parse(fileData);
  const tokens = getConfigTokens(fileObj);

  for (const token of tokens) {
    if (token.color) {
      console.log(`${token.key}=${token.color}`);
      continue;
    }
    console.log(`${token.key}`);
  }
}

main();
