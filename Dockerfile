# FROM node:20

# WORKDIR /code

# COPY package.json package-lock.json ./
# RUN npm install

FROM public.ecr.aws/docker/library/node:20-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /api-ts-ddd-skeleton

COPY package.json package-lock.json ./
RUN  npm install

FROM public.ecr.aws/docker/library/node:20-alpine AS builder
WORKDIR /api-ts-ddd-skeleton
COPY --from=deps /api-ts-ddd-skeleton/node_modules ./node_modules
COPY . .

RUN npm run build

FROM public.ecr.aws/docker/library/node:20-alpine AS runner
WORKDIR /api-ts-ddd-skeleton

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 node_api

COPY --from=builder --chown=node_api:nodejs /api-ts-ddd-skeleton/dist ./dist
# TODO: copy every file with .env in the name to the corresponding location in build folder
COPY --from=builder /api-ts-ddd-skeleton/node_modules ./node_modules
COPY --from=builder /api-ts-ddd-skeleton/package.json ./package.json

USER node_api

CMD ["npm", "run", "start:backoffice"]
