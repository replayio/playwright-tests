# Playwright Tests

Playwright Tests is the test suite we use to ensure Replay can record and replay top sites.

## How to run

```bash
npm install
node examples/airbnb.js
RECORD_REPLAY_API_KEY=123 npx @replayio/replay view-latest
```


## FAQ

### Playwright version

All runs using scripts in this repository are currently version locked to playwright 1.10.0, due to the changing names for firefox subdirectories (e.g. firefox-1238) between playwright versions. This would be nice to improve.


### You can disable `headless` mode to view the browser

```js
const browser = await firefox.launch({
  headless: false,
});
```

> Playwright's [CLI](https://playwright.dev/docs/cli/) is a great way to record new tests

### Creating new tests

```
npx playwright codegen airbnb.com
```
