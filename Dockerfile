FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile
COPY . .
RUN npm run build
 
# Stage 2: Serve the build with http-server
FROM node:20-alpine AS runner
WORKDIR /app
RUN npm install -g http-server
COPY --from=builder /app/dist ./dist
EXPOSE 8080
CMD ["http-server", "dist", "-p", "8083"]

# docker build -t  chandansutradhar/psb-connect-hub:0.0.1 .

# docker tag chandansutradhar/psb-connect-hub:0.0.1 103.150.136.184:5000/chandansutradhar/psb-connect-hub:0.0.1

# docker push 103.150.136.184:5000/chandansutradhar/psb-connect-hub:0.0.1

# docker pull 103.150.136.184:5000/chandansutradhar/psb-connect-hub:0.0.1

# docker run -d --name psb-connect-hub --restart on-failure -p 30020:8083 103.150.136.184:5000/chandansutradhar/psb-connect-hub:0.0.1
