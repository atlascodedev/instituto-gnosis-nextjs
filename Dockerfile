
# --- Root Node --- #
FROM node:16-slim

# Install curl to get PNPM
RUN apt update -y
RUN apt install curl -y
# Install PNPM
RUN curl -f https://get.pnpm.io/v6.7.js | node - add --global pnpm@6 && pnpm config set store-dir ~/.pnpm-store

# --- Dependencies node --- #

ADD package.json /tmp/package.json
RUN cd /tmp && pnpm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/



# --- Build node --- #
RUN pnpx run nx core:build
WORKDIR /opt/app
COPY . /opt/app/




# --- Server connection node --- #
ENV PORT=8080
EXPOSE 8080
WORKDIR /opt/app/dist/apps/core

CMD ["npm", "start", "--", "--port", "8080"]



