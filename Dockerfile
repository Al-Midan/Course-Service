# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the source code and build the application
COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine AS runtime

WORKDIR /app

# Copy the built application and production dependencies
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm ci --only=production

# Expose the application port
EXPOSE 5002

# Start the application
CMD ["node", "dist/app.js"]
