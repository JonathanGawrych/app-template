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
