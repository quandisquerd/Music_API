FROM node:18-alpine

# Cài ffmpeg (nếu cần)
RUN apk add --no-cache ffmpeg

WORKDIR /app

# Copy package files trước để tận dụng cache Docker
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port (tuỳ ứng dụng của bạn)
EXPOSE 3000

CMD ["npm", "start"]