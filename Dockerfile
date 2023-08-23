FROM node:18-bookworm-slim

COPY . /src/
WORKDIR /src
RUN corepack enable
RUN corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

ARG BACKEND_HOST
ARG PGN_CMS_HOST
WORKDIR /src/apps/kporg-frontend2
RUN pnpm run build

CMD ["pnpm", "run", "start"]
