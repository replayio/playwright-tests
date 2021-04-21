import { spawnSync, SpawnSyncOptions } from "child_process";

export function randomElement<T>(array: T[]): T {
  const index = (Math.random() * array.length) | 0;
  return array[index];
}

function getCharacters(start: string, end: string) {
  const rv = [];
  for (let i = start.charCodeAt(0); i <= end.charCodeAt(0); i++) {
    rv.push(String.fromCharCode(i));
  }
  return rv;
}

export function randomString(length: number) {
  const characters = [
    ...getCharacters("0", "9"),
    ...getCharacters("a", "z"),
    ...getCharacters("A", "Z"),
  ];

  let text = "";
  for (let i = 0; i < length; i++) {
    text += randomElement(characters);
  }
  return text;
}

export function waitForTime(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const MsPerSecond = 1000;

export function currentPlatform(): string {
  switch (process.platform) {
    case "darwin":
      return "macOS";
    case "linux":
      return "linux";
    default:
      throw new Error(`Platform ${process.platform} not supported`);
  }
}

export function spawnChecked(cmd: string, args: string[], options?: SpawnSyncOptions) {
  const prettyCmd = [cmd].concat(args).join(" ");
  console.error(prettyCmd);

  const rv = spawnSync(cmd, args, options);

  if (rv.status != 0 || rv.error) {
    console.error(rv.error);
    throw new Error(`Spawned process failed with exit code ${rv.status}`);
  }

  return rv;
}
