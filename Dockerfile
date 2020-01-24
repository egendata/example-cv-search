FROM node:12-alpine

# Setup user
ENV USER=cv-user
RUN adduser --disabled-password --gecos "" $USER

# Create app dir
WORKDIR /app

# Install app dependencies
COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci

# Bundle app source
COPY ./ ./

RUN npm run build

RUN chown -R $USER:$(id -gn $USER) /app
RUN chmod -R 777 /app

USER $USER
CMD [ "npm", "start" ]
