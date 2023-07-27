#!/bin/sh

# Start the Laravel application
php artisan serve --host=0.0.0.0 &

# Change to the frontend directory
cd frontend

# Install dependencies and start the Vue.js development server
npm install
npm run serve
