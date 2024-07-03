# Use a Node.js base image
FROM node:20.10.0-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json of the root and frontend
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Install root dependencies
RUN npm install

# Install frontend dependencies
RUN npm install --prefix frontend

# Ensure Vite is installed in the frontend
RUN npm install vite --prefix frontend

# List contents of the frontend node_modules to verify Vite installation (for debugging)
RUN ls -la /app/frontend/node_modules

# Copy the entire project
COPY . .

# Build the frontend using npx to ensure local Vite is used
RUN npm run build --prefix frontend

# Expose the desired port (adjust as needed)
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
