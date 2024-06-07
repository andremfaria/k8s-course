# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose a port (if your application listens on a specific port)
EXPOSE 3000

# Define the command to run your application
CMD [ "pnpm", "start" ]