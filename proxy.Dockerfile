FROM php:8.2.15-apache

WORKDIR /var/www/Pixees

RUN a2enmod rewrite
RUN a2enmod headers

EXPOSE 80

COPY php.ini $PHP_INI_DIR/php.ini
COPY vhost.conf /etc/apache2/sites-available/000-default.conf