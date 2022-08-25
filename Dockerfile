# Base image
FROM node

# Work Directory in container
WORKDIR /usr/app

# COPY package.json and source code files
COPY ./ /usr/app

# Install dependencies
RUN npm install

# Set up a default command
CMD [ "npm","run","dev" ]