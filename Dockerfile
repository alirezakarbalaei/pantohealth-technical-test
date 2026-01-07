FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy app code
COPY . .

# Build the production version
RUN npm run build

# Expose the container port
EXPOSE 4005

# Start production server
CMD ["npm", "run", "start"]
