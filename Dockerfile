FROM node:12.13.0-alpine3.10 as base

LABEL org.opencontainer.image.authors=darin.estrin@gmail.com
LABEL org.opencontainer.image.=title="Lore Tracker Api Server"
LABEL org.opencontainer.image.licenses=ISC
LABEL org.opencontainer.nodeversion=$NODE_VERSION

RUN apk update
RUN apk add bash

ENV PATH /node/app/node_modules/.bin:$PATH
# ENV TINI_VERSION v0.18.0

# ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
# RUN chmod +x /tini
# ENTRYPOINT [ "/tini", "--" ]
CMD ["node"]

FROM base as dev

WORKDIR /node/app
COPY package.json package-lock*.json ./
RUN npm install

COPY . .

CMD ["node"]