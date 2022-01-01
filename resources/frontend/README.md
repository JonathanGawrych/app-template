# Frontend Template

A great starting place.

## Build

First you're going to need to [install NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
on your system if you haven't done so yet.

Then you'll need to [install Yarn](https://yarnpkg.com/getting-started/install).

Now you need to fetch all the vendor files by running:
```bash
yarn
```

To build the project run:
```bash
ng build
```
The build artifacts will be stored in the project root directory `public/dist`.

Add `--watch` if you want to continuely rebuild on source file changes.

Add `--configuration production` if you want to enable production mode to disable debugging and improve speed/size.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io/).

## Code scaffolding

Run `ng generate component component-name` to generate a new component.
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.
