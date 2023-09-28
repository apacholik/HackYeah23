FROM node:18-alpine AS base
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV SCOPE=web-app
ENV YARN_CACHE_FOLDER=.yarn-cache

FROM base AS pruner
RUN yarn global add turbo@1.1.2
COPY . .
RUN turbo prune --scope=${SCOPE} --docker

FROM base AS dev-deps
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

FROM base AS prod-deps
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
COPY --from=dev-deps /app/${YARN_CACHE_FOLDER} /${YARN_CACHE_FOLDER} 
RUN yarn install --frozen-lockfile --production --prefer-offline --ignore-scripts
RUN rm -rf /app/${YARN_CACHE_FOLDER}

FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
# NOTE: Place for production (build-time) NEXT PUBLIC envs injection!
ARG NEXT_PUBLIC_SAMPLE_FRONTEND='sample client env'
ENV NODE_ENV=production
ENV NEXT_PUBLIC_SAMPLE_FRONTEND=${NEXT_PUBLIC_SAMPLE_FRONTEND}
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
COPY --from=dev-deps /app/ .
COPY --from=pruner /app/out/full/ .
RUN yarn build --scope=${SCOPE} --include-dependencies --no-deps
RUN find . -name node_modules | xargs rm -rf

FROM base AS runner
ENV NEXT_TELEMETRY_DISABLED=1
# NOTE: Place for production SERVER (NODE.JS) envs injection!
ARG SAMPLE_BACKEND='sample backend env'
ENV NODE_ENV=production
ENV SAMPLE_BACKEND=${SAMPLE_BACKEND}
# - - - - - - - - - - - - - - - - - - - - - - - - - - - -
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=prod-deps --chown=nextjs:nodejs /app/ .
COPY --from=builder --chown=nextjs:nodejs /app/ .
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD yarn workspace ${SCOPE} start