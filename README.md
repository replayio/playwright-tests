# Running Playwright tests with replay

Playwright scripts can run using replay-enabled versions of firefox on macOS and linux. These instructions describe how to run and record the attached basic.js test.  Run these instructions from the terminal in this directory.

`run.ts` automates the steps below and is used to run playwright tests in this repository.

The `fuzzing` directory contains playwright scripts used for fuzz testing different websites.

The `examples` directory contains playwright scripts that perform a fixed series of actions on different websites.

## macOS installation

1. `npm ci` Install dependencies
2. `./install_macOS.sh` Install Replay
3. `PLAYWRIGHT_BROWSERS_PATH=$PWD/browsers RECORD_REPLAY_DRIVER=$PWD/browsers/firefox-1225/macOS-recordreplay.so RECORD_REPLAY_RECORDING_ID_FILE=$PWD/recordings.log RECORD_REPLAY_SERVER=wss://dispatch.replay.io RECORD_ALL_CONTENT=1 node examples/whatsmyuseragent.js` run test
4. `cat recordings.log` to view the last recording

## Docker installation

1. `npm ci` Install dependencies
1. `docker image pull recordreplayinc/playwright:latest` download image
2. `docker run -v $PWD:/test -it recordreplayinc/playwright:latest bash` start container
4. `RECORD_REPLAY_RECORDING_ID_FILE=/recordings.log RECORD_REPLAY_SERVER=wss://dispatch.replay.io RECORD_ALL_CONTENT=1 node test/examples/whatsmyuseragent.js` run test
5. `cat recordings.log` to view the last recording

The image can also be built directly with `docker build --no-cache -t recordreplayinc/playwright:latest - < Dockerfile`

## Playwright version

All runs using scripts in this repository are currently version locked to playwright 1.8.1, due to the changing names for firefox subdirectories (e.g. firefox-1225) between playwright versions.  This would be nice to improve.
