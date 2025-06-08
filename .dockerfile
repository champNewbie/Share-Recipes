FROM node:20 as build

WORKDIR /app

COPY ./package.json /package-lock.json ./

RUN npm install

# Copy Prisma schema
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:20 as runner

EXPOSE 3000

# Copy file after build
COPY package.json package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma

CMD [ "npm" ,"run" , "start"]