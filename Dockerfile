FROM node

RUN mkdir -p /src
WORKDIR /src

# Install app dependencies
COPY package.json /src/package.json
RUN npm install

COPY . /src

EXPOSE 8080

CMD ["npm", "start"]
