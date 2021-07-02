FROM alpine:3.11
# Setup Work directory.
WORKDIR /usr/src/api
COPY package.json ./

# Let's install everything!
RUN apk add --update \
    && apk add --no-cache nodejs-current nodejs-npm \
    && apk add --no-cache --virtual .build git curl build-base g++ \
    && npm install \
    && apk del .build


# add custom config settings
#Your Bot's Token. Available on https://discordapp.com/developers/applications/me . Default McDebugs Token
ENV TOKEN=test
#Whether the bot's in debug mode
ENV DEBUG_MODE=1
#What is the API base URL
ENV BASE_API=http://nginx:80/dropwizard-mongodb-ms/

# Copy project to our WORKDIR
COPY . .
EXPOSE 1337
# Let's run it!
CMD [ "node", "--max_old_space_size=450", "src/index.js" ]