FROM node:lts-alpine

WORKDIR /tmp
RUN apk add gpg gpg-agent && \
  wget -qO - https://keybase.io/pnpm/pgp_keys.asc | gpg --import && \
  wget -q https://get.pnpm.io/SHASUMS256.txt && \
  wget -q https://get.pnpm.io/SHASUMS256.txt.sig && \
  gpg --verify SHASUMS256.txt.sig SHASUMS256.txt && \
  wget https://get.pnpm.io/v6.16.js && \
  grep v6.16.js SHASUMS256.txt | sha256sum -c - && \
  cat v6.16.js | node - add --global pnpm && \
  rm SHASUMS256.txt v6.16.js

WORKDIR /app
COPY pnpm-lock.yaml ./
RUN pnpm fetch --dev

COPY ./src/.svelte-kit .svelte-kit

ADD . ./
RUN pnpm install --offline --dev

RUN pnpm install

RUN pnpm run build

RUN chmod 755 /app/src

EXPOSE 5173

CMD [ "pnpm", "run", "dev", "--host"]
