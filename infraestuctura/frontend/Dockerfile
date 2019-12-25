
FROM node:8.14 

ENV NPM_CONFIG_LOGLEVEL info 

RUN apt-get update 

RUN npm install -g npm@5.6.0

RUN mkdir frontend
WORKDIR frontend 
ADD run.sh /run.sh
EXPOSE 4200
EXPOSE 3000
EXPOSE 4201

CMD ["/run.sh"]
