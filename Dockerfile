FROM php:7.4-fpm

WORKDIR /var/www/html

COPY . /var/www/html

RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    && docker-php-ext-install zip pdo pdo_mysql \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer install

RUN chown -R www-data:www-data /var/www/html/storage

CMD php artisan serve --host=0.0.0.0 

EXPOSE 8000
