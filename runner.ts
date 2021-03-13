import { folio as base } from "folio";
import * as debug from "debug";
import * as fs from "fs";

const fixtures = base.extend<{
  headful: true;
  location: "examples/vscode-04.ts";
}>();

export const folio = fixtures.build();
