FROM alpine:3.10 as install

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Setup Work directory.
WORKDIR /usr/src/api
COPY package.json ./

# Let's install everything!
# will not install devDependencies in production
RUN apk add --update \
    && apk add --no-cache nodejs-current npm \
    && apk add --no-cache --virtual .build git curl build-base g++ \
    && npm install \
    && apk del .build

# Copy project to our WORKDIR
COPY . .

FROM install as run

# add custom config settings
#Your Patreon API TOKEN
ENV PATREON_TOKEN=test
#Whether the bot's in debug mode
ENV DEBUG_MODE=1
#What is the API base URL
ENV BASE_API=http://nginx:80/dropwizard-mongodb-ms/

# Copy project to our WORKDIR
WORKDIR /usr/src/api

#Expose port 1337
EXPOSE 1337

# Let's run it!
CMD [ "node", "--max_old_space_size=450", "src/index.js" ]