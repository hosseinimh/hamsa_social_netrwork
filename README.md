# Hamsa Social Network

To run the application, first create a database called `hamsa_db` in your MySQL Server, then head to `src` directory and run these commands into a CLI:

```
composer install
php artisan key:generate
php artisan migrate
php artisan code:init
npm run development
php artisan serve
```

The application will be available on:

```
http://127.0.0.1:8000
```

Happy testing!

Mahmoud Hosseini
