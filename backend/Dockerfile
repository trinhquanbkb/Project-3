# Stage 1: Xây dựng ứng dụng NestJS
FROM node:15-alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

# Stage 2: Đóng gói ứng dụng
FROM node:15-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production

COPY --from=builder /app/dist ./dist

RUN mkdir -p dist/uploads

EXPOSE 3303

CMD ["node", "dist/main"]
