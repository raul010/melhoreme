## FROM elgalu/selenium
# FROM selenium/node-chrome-debug
FROM ubuntu
MAINTAINER raul@melhore.me

ENV DEBIAN_FRONTEND noninteractive
ENV PYTHON /usr/bin/python2.7
ENV JAVA_HOME /usr/lib/jvm/java-1.7.0-openjdk-amd64
ENV DISPLAY :99.0
ENV CHROME_BIN=/usr/bin/google-chrome-stable

# For MongoDB
RUN echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list

RUN sed -i 's/us-central1.gce/us-central1.gce.clouds/' /etc/apt/sources.list 

RUN apt-get update

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# to install build-essential
# RUN apt-get install -y libc6 libalgorithm-merge-perl bzip2 libdpkg-perl libc6-dev g++ dpkg-dev 
# to node-gyp
RUN apt-get install -y python2.7
RUN apt-get install -y build-essential --no-install-recommends

RUN apt-get install -y curl

# RUN apt-get update \
	# && apt-get install -y --no-install-recommends \
RUN	apt-get install -y ca-certificates
RUN apt-get install -y wget
# RUN apt-get install -y --no-install-recommends gconf-service libasound2 libnspr4 libnss3 libpango1.0-0 fonts-liberation
# RUN apt-get install -y --no-install-recommends libxtst6 libxss1 libappindicator1 libindicator7 xdg-utils 

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb 
# RUN dpkg -i google-chrome*.deb 
RUN dpkg -i google-chrome*.deb || true
RUN apt-get install -f -y

RUN apt-get install -y --no-install-recommends \
	xfonts-base \
	xvfb

RUN apt-get install -y --force-yes openjdk-7-jdk --no-install-recommends

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 5.9.0
ENV NVM_VERSION 0.31.0

# Install nvm with node and npm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v$NVM_VERSION/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

RUN apt-get install -y --force-yes git 

ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

 	
# RUN npm install -g gulp
#
# RUN apt-get autoremove -y \
#	&& apt-get clean -y \

ENV APP_NAME melhoreme

RUN mkdir -p /$APP_NAME

# COPY . /usr/src/$APP_NAME

WORKDIR /$APP_NAME

# COPY package.json /$APP_NAME/

# COPY bower.json  /$APP_NAME/

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN apt-get install -y --force-yes mongodb-org

# RUN mongo --version
RUN mkdir -p /data/db
RUN chown -R `id -u` /data/db 
# RUN mkdir -p /data/db-backup
# RUN mkdir -p /data/scripts
# ADD .bin/db-backup /data/db-backup

# RUN sleep 20
# RUN mongodump --db "melhoreme-test" -o /data/db-backup/
# RUN mongodump --db "admin" -o /data/db-backup/


RUN npm install -g bower
RUN npm install -g gulp
RUN npm install -g protractor
# RUN npm install -g phantomjs 

# RUN npm install -g phantomjs-prebuilt

# RUN npm config set unsafe-perm true
# RUN npm config set strict-ssl false
# RUN npm install
# RUN npm config set unsafe-perm false
# RUN npm set strict-ssl true

# EXPOSE 27017 8080 3000 4444

# RUN mongorestore .bin/db-backup

# CMD ["mongorestore", "./db-backup"]
# ENTRYPOINT ["nohup mongod &; mongorestore .bin/db-backup; nohup gulp run &; sleep 30; ./node_modules/protractor/bin/webdriver-manager update; nohup gulp pre-tests &; sleep 10; gulp e2e"]
