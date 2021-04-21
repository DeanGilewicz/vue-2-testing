FROM node:14-alpine as build

WORKDIR /app

COPY package.json .

RUN npm install --only=production

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# build image
# specify dockerfile file location
# tag image
# set context as root context
# docker build -f dockerfiles/client/Dockerfile -t 'v2t-fe' .

# run container in detached mode
# remove container when shut down
# expose port 80 via 3000 on host machine
# set container name
# run container based on defined image
# docker run -d --rm -p 3000:80 --name vue-2-testing v2t-fe
