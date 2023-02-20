FROM node:14.15.4

COPY ["package.json","package-lock.json","./"]

COPY . .
COPY prisma ./prisma
RUN npm install
RUN npm run build
RUN npm install -g prisma
RUN npx prisma validate && npx prisma migrate deploy
# # RUN npx prisma generate
EXPOSE 8080
CMD ["npm","start"]


