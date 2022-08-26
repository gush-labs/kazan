# Base image
FROM node:16

# Work Directory in container
WORKDIR /usr/app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

EXPOSE 5173

# Set up a default command
CMD [ "npm", "run", "dev", "--", "--host" ]
