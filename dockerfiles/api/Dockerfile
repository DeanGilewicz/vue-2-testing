FROM node:14-alpine

WORKDIR /app

COPY api/package.json .

RUN npm install --only=production

COPY api/ .

EXPOSE 4000

CMD ["npm", "start"]

# build image
# specify dockerfile file location
# tag image
# set context as root context
# docker build -f dockerfiles/api/Dockerfile -t 'v2t-api' .

# run container in detached mode
# remove container when shut down
# expose port 4000 via 4000 on host machine
# set container name
# run container based on defined image
# docker run -d --rm -p 4000:4000 --name vue-2-testing-api v2t-api
