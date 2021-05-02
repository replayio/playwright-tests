# Dockerfile to build an image with the replay version of playwright/firefox installed.

FROM mcr.microsoft.com/playwright@sha256:45243b7a97477423de2807804f2b623159eea2dd0e0055c28dafd23c65a2e508

# Replace firefox installation
RUN cd /root/.cache/ms-playwright/firefox-1238 && rm -rf firefox && curl https://replay.io/downloads/linux-replay-playwright.tar.xz > firefox.tar.xz && tar xf firefox.tar.xz && rm firefox.tar.xz && cd /

# Download record/replay driver
RUN curl https://replay.io/downloads/linux-recordreplay.so > /root/.cache/ms-playwright/linux-recordreplay.so
ENV RECORD_REPLAY_DRIVER=/root/.cache/ms-playwright/linux-recordreplay.so
