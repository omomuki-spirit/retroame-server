FROM node:20.15.0-bookworm-slim

ENV TZ   "Asia/Tokyo"
ENV LANG "ja_JP.UTF-8"

RUN apt update && apt upgrade -y && apt install -y --no-install-recommends \
      openssl \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir /app
WORKDIR /app

ADD package.json /app/package.json
ADD yarn.lock    /app/yarn.lock
RUN yarn cache clean && yarn install

ADD . /app
RUN yarn run build

CMD ["yarn", "run", "server"]
