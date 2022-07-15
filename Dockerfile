FROM node:14.18.0-alpine AS builder
WORKDIR /src
RUN echo "@ubiquity:registry=https://gitlab.com/api/v4/projects/27274533/packages/npm/">>.npmrc
RUN echo "//gitlab.com/api/v4/projects/27274533/packages/npm/API_KEY=$API_KEY">>.npmrc
RUN echo "always-auth=true">>.npmrc
COPY /.env .
COPY /package.json .
COPY /package-lock.json .
RUN npm install
COPY /public/ ./public
COPY /src/ ./src
RUN npm run build

FROM node:14.18.0-alpine AS final
USER root
WORKDIR /app
COPY --from=builder /src/node_modules /app/node_modules/
COPY --from=builder /src/build/ /app/build/
COPY --from=builder /src/package.json /app/package.json
COPY --from=builder /src/package-lock.json /app/package-lock.json
CMD [ "npm", "run", "serve" ]