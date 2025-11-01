FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS prod

WORKDIR /app
COPY pnpm-lock.yaml package.json .
RUN pnpm install
COPY . /app
RUN pnpm run build
RUN pnpm prune --prod --ignore-scripts

FROM base
WORKDIR /app
COPY --from=prod /app/build build/
COPY --from=prod /app/node_modules node_modules
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "build"]
