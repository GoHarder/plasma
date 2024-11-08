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
const attributeFilter = [
  /sodipodi/,
  /inkscape/,
  /:rdf/,
  /:cc/,
  /:dc/,
];

// MARK: Helpers
// -------------------------------------------------------------------------

function cleanAttributes(attr: Attributes) {
  for (const key in attr) {
    attributeFilter.forEach((regex) => {
      if (regex.test(key)) {
        delete attr[key];
      }
    });

    if (attr.id && /^\w+\d+$/.test(`${attr.id}`)) {
      delete attr.id;
    }
  }
  return attr;
}

function clean(items: Element[]) {
  items = items.filter((item) => /sodipodi/.test(item?.name ?? "") === false);
  items = items.filter((item) => /metadata/.test(item?.name ?? "") === false);

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

function round(data: string) {
  return data.replace(/\d+\.\d{4,}/g, (match) => {
    const matchFloat = parseFloat(match);
    const rounded = Math.round(matchFloat * 1000) / 1000;
    return rounded.toString();
  });
}

function replace(data: string) {
  data = data.replace(
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n',
    "",
  );

  data = data.replace(/(z|Z)\s"/, '$1"');

  return data;
}

function convertNums(data: string) {
  return data.replace(/\d(\.\d+)?e-\d+/g, (match) => {
    const [preStr, postStr] = match.split("e-");
    if (!preStr || !postStr) {
      return match;
    }
    let output = "0.";
    const zeros = Array.from({ length: parseInt(postStr) - 1 }, (_) => "0");

    output += zeros.join("");
    output += preStr.replace(".", "");

    return output;
  });
}

// MARK: Main
// -------------------------------------------------------------------------

async function main() {
  if (!filePath) return;

  let fileData = await Deno.readTextFile(filePath);

  fileData = convertNums(fileData);

  const data = convert.xml2js(fileData, { compact: false }) as convert.Element;

  if (!data.elements) return;

  data.elements = clean(data.elements);

  let newSvg = convert.js2xml(data, { spaces: 2 });

  newSvg = round(newSvg);
  newSvg = replace(newSvg);

  Deno.writeTextFile(filePath, newSvg);
}

main();
