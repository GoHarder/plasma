#!/usr/bin/env -S deno run --allow-read --allow-write

// MARK: NPM imports
// -------------------------------------------------------------------------
import convert from "npm:xml-js";

// MARK: Types
// -------------------------------------------------------------------------
type Element = convert.Element;
type Attributes = convert.Attributes;

// MARK: Constants
// -------------------------------------------------------------------------
const filePath = Deno.args.at(0);

// MARK: Helpers
// -------------------------------------------------------------------------

function cleanAttributes(attr: Attributes) {
  for (const key in attr) {
    if (/sodipodi/.test(key)) {
      delete attr[key];
    }
    if (/inkscape/.test(key)) {
      delete attr[key];
    }
    if (attr.id && /\w+\d+/.test(`${attr.id}`)) {
      delete attr[key];
    }
  }
  return attr;
}

function clean(items: Element[]) {
  items = items.filter((item) => /sodipodi/.test(item?.name ?? "") === false);

  for (const item of items) {
    if (item.attributes) {
      item.attributes = cleanAttributes(item.attributes);
    }
    if (item.elements) {
      item.elements = clean(item.elements);
    }
  }

  return items;
}

// MARK: Main
// -------------------------------------------------------------------------

async function main() {
  if (!filePath) return;

  const fileData = await Deno.readTextFile(filePath);

  const data = convert.xml2js(fileData, { compact: false }) as convert.Element;

  if (!data.elements) return;

  data.elements = clean(data.elements);

  const newSvg = convert.js2xml(data, { spaces: 2 });

  Deno.writeTextFile(filePath, newSvg);
}

main();
