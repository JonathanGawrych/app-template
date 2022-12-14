FROM ubuntu:21.10

LABEL maintainer="Taylor Otwell"

ARG WWWGROUP
ARG NODE_VERSION=16

WORKDIR /var/www/html

ENV DEBIAN_FRONTEND noninteractive
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update \
	&& apt-get install -y nano gnupg gosu curl ca-certificates zip unzip git supervisor sqlite3 libcap2-bin libpng-dev python2 wget \
	&& mkdir -p ~/.gnupg \
	&& chmod 600 ~/.gnupg \
	&& echo "disable-ipv6" >> ~/.gnupg/dirmngr.conf \
	&& apt-key adv --homedir ~/.gnupg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys E5267A6C \
	&& apt-key adv --homedir ~/.gnupg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C300EE8C \
	&& echo "deb http://ppa.launchpad.net/ondrej/php/ubuntu impish main" > /etc/apt/sources.list.d/ppa_ondrej_php.list \
	&& apt-get update \
	&& apt-get install -y php8.1-cli php8.1-dev \
		php8.1-pgsql php8.1-sqlite3 php8.1-gd \
		php8.1-curl php8.1-memcached \
		php8.1-imap php8.1-mysql php8.1-mbstring \
		php8.1-xml php8.1-zip php8.1-bcmath php8.1-soap \
		php8.1-intl php8.1-readline php8.1-pcov \
		php8.1-msgpack php8.1-igbinary php8.1-ldap \
		php8.1-redis php8.1-swoole \
		php8.1-fpm \
	&& php -r "readfile('https://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer \
	&& curl -sL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash - \
	&& apt-get install -y nodejs \
	&& curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
	&& echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list \
	&& apt-get update \
	&& apt-get install -y yarn \
	&& apt-get install -y mysql-client \
	&& apt-get install -y postgresql-client \
	&& apt-get install -y nginx \
	&& apt-get -y autoremove \
	&& apt-get clean \
	&& wget http://pear.php.net/go-pear.phar \
	&& php go-pear.phar \
	&& pecl channel-update pecl.php.net \
	&& rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install xdebug and remove stupid "could not connect to client" popping up all the time
RUN pecl install --nobuild xdebug
RUN sed -i '/.*xdebug_log_ex(XLOG_CHAN_DEBUG, XLOG_ERR, "NOCON".*/d' $(pecl config-get temp_dir)/xdebug/src/debugger/com.c
RUN cd $(pecl config-get temp_dir)/xdebug && phpize && ./configure && make && make install

RUN setcap "cap_net_bind_service=+ep" /usr/bin/php8.1

RUN groupadd --force -g $WWWGROUP sail
RUN useradd -ms /bin/bash --no-user-group -g $WWWGROUP -u 1337 sail

RUN rm /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/conf.d/
COPY start-container /usr/local/bin/start-container
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY php.ini /etc/php/8.1/cli/conf.d/99-sail.ini
RUN chmod +x /usr/local/bin/start-container

EXPOSE 8000

ENTRYPOINT ["start-container"]
