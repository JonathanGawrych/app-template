# Backend Template

A great starting place.

## Setup

Obviously you're first going to need to [install PHP](https://www.php.net/manual/en/install.php)
on your system if you haven't done so yet. Developed on PHP 8.0, if you are on a different
version, your mileage may vary...

Next, you'll need some dependencies.
[Install composer](https://getcomposer.org/doc/00-intro.md), then run:
```bash
composer install
```

Finally, bring up the docker containers via laravel sail:
```bash
./vendor/bin/sail up -d
```

That's it for the backend. Head over to <resources/frontend/README.md> to build
the angular frontend.

## Running Tests

Now that everything is set up, run the test with:
```bash
./vendor/bin/phpunit
```

Look in the coverage folder for what's covered and what's not

## Running Static Analysis

After you make your changes there are some static analysis rules to ensure type safety:
```bash
./vendor/bin/phpstan
```

## Running Lint

After you make your changes there are some lint rules to keep everything nice and neat.
```bash
./vendor/bin/phpcs
```
