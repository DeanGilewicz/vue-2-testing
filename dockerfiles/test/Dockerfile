FROM cypress/browsers:node12.14.1-chrome83-ff77

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "run", "test:coverage:all"]

# build image
# specify dockerfile file location
# tag image
# set context as root context
# docker build -f dockerfiles/test/Dockerfile -t 'cypress-chrome' .

# run container in detached mode
# remove container when shut down
# expose port 80 via 3000 on host machine
# set container name
# mount project files into container from host machine (and set it as read only - ro not working) (local dev / running only)
# keep container installed node_modules folder intact and do not override with host machine files
# run container based on defined image
# docker run -d --rm -p 3000:80 --name app-test-coverage -v $(pwd):/app -v app/node_modules cypress-chrome
