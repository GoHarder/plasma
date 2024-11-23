# Plasma

Test project under development.

## Theme Tokens

### Elevations

#### Before

opacity 0.3

| Elevation | x   | y   | blur | spread |
| --------- | --- | --- | ---- | ------ |
| 1         | 0px | 1px | 2px  | 0px    |
| 2         | 0px | 1px | 2px  | 0px    |
| 3         | 0px | 1px | 3px  | 0px    |
| 4         | 0px | 2px | 3px  | 0px    |
| 5         | 0px | 4px | 4px  | 0px    |

#### After

opacity 0.15

| Elevation | x   | y   | blur | spread |
| --------- | --- | --- | ---- | ------ |
| 1         | 0px | 1px | 3px  | 1px    |
| 2         | 0px | 2px | 6px  | 2px    |
| 3         | 0px | 4px | 8px  | 3px    |
| 4         | 0px | 6px | 10px | 4px    |
| 5         | 0px | 8px | 12px | 6px    |

### Shapes

| Name        | original size | custom size |
| ----------- | ------------- | ----------- |
| extra-small | 4px           | 4px         |
| small       | 8px           | 6px         |
| medium      | 12px          | 8px         |
| large       | 16px          | 10px        |
| extra-large | 28px          | 12px        |

### System Colors

| Name       | hex     | test    |
| ---------- | ------- | ------- |
| error      | #c42b1c | #e26b63 |
| warning    | #ffc100 | #f1d66b |
| success    | #008a17 | #57b095 |
| link       | #99ebff | #98f7fd |
| link-hover | #99ebff | #99ddff |
| link-used  | #99ebff | #7abccc |

### Desktop Widget Colors

| Name             | hex     |
| ---------------- | ------- |
| Text             | #e2e2e5 |
| Background       | #282a2d |
| Highlight        | #95ccff |
| ViewText         | #e2e2e5 |
| ViewBackground   | #1e2022 |
| ViewHover        | #d5e4f6 |
| ViewFocus        | #b9c8da |
| ButtonText       | #95ccff |
| ButtonBackground | #333538 |
| ButtonHover      | #95ccff |
| ButtonFocus      | #b9c8da |

surfaceContainerHighest = #282a2d + white at 5%
outlineVariant = #282a2d + white at 15%
PrimaryContainer = #95ccff + black at 70%
onPrimaryContainer = #95ccff + white at 50%

## TODO
- [ ] Kvantum
  - [X] Tool buttons need arrows
  - [ ] Increase line edit size
