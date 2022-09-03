FROM devilbox/php-fpm-8.1:latest

RUN apt-get update && apt-get install -y libpng-dev zlib1g-dev nano libmcrypt-dev libzip-dev zip wget git

RUN docker-php-ext-install gd opcache pdo_mysql zip

RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --version=2.3.5 && \
     mv composer.phar /usr/local/bin/composer

RUN wget -O drush.phar https://github.com/drush-ops/drush-launcher/releases/latest/download/drush.phar

RUN chmod +x drush.phar

RUN mv drush.phar /usr/local/bin/drush

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
