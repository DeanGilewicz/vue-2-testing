# vue-2-testing

### Project Overview

This project consists of:
  1. A Todo Application including unit, integration and e2e tests
  2. A Contribution page consisting of the guidelines for how to submit merge requests for this project
  3. A Documentation section providing detailed information regarding the testing strategy implemented, including comprehensive testing examples\
&nbsp;
&nbsp;
### Project Setup

Once you have cloned this project, `cd` into the project directory and run `npm install`.\
&nbsp;
&nbsp;
### Local Development

To run the project for local development run `npm run serve`. This will start a development server (with hot module reloading) on `http://localhost:8080` and compiles the non-optimized development build of the project.\
&nbsp;
&nbsp;
### Linting Files

To format and lint your code run `npm run lint`. This will run automatically when making a code commit via Husky.\
&nbsp;
&nbsp;
### Testing

This project consists of unit, integration and end-to-end tests that are implemented for the Todo Application.

Test code is instrumented by Istanbul and code coverage reports are generated via NYC.

Minimum thresholds are in place and tests will fail should code coverage fall below these thresholds.\
&nbsp;
&nbsp;
#### Unit

- To run unit tests in watch mode run `npm run test:unit:watch`. This is recommended when writing your tests, especially for TDD.
- To run unit tests one time run `npm run test:unit`.\
&nbsp;
&nbsp;
#### Integration

- To run integration tests in watch mode run `npm run test:integration:watch`. This is recommended when writing your tests, especially for TDD.
- To run integration tests one time run `npm run test:integration`.\
&nbsp;
&nbsp;
#### End-To-End

- To run e2e tests in watch mode run `npm run test:e2e:watch`. This is recommended when writing your tests, especially for TDD. This command will open an interactive Cypress interface that allows you to view tests in a browser and debug.
- To run e2e tests one time in a headless browser run `npm run test:e2e`.\
&nbsp;
&nbsp;
### Code Coverage

Code coverage has been implemented independently for unit, integration and e2e tests. In addition, combined code coverage is available via NYC and in a generated `coverage.json` file.\
&nbsp;
&nbsp;
#### Unit

- To generate a code coverage report for unit tests run `npm run coverage:unit`.
- Should test coverage fall below set thresholds then these test will fail. A report will still be generated to provide insight into where there is a lack of code coverage.
- Upon test completion a report will be generated inside of the `coverage` folder found at the project root.
- For a human readable report, open up `coverage/lcov-report/index.html` in your default browser.\
&nbsp;
&nbsp;
#### Integration

- To generate a code coverage report for integration tests run `npm run coverage:integration`.
- Should test coverage fall below set thresholds then these test will fail. A report will still be generated to provide insight into where there is a lack of code coverage.
- Upon test completion a report will be generated inside of the `coverage` folder found at the project root.
- For a human readable report, open up `coverage/lcov-report/index.html` in your default browser.\
&nbsp;
&nbsp;
#### End-To-End

- To generate a code coverage report for integration tests run `npm run coverage:e2e`.
- Should test coverage fall below set thresholds then these test will fail. A report will still be generated to provide insight into where there is a lack of code coverage.
- Upon test completion a report will be generated inside of the `coverage` folder found at the project root.
- For a human readable report, open up `coverage/lcov-report/index.html` in your default browser.\
&nbsp;
&nbsp;
#### Combined Coverage Report

- To generate a combined code coverage report for unit, integration and e2e tests run `npm run coverage:all`.
- Should test coverage fall below independently set thresholds then these test will fail. A report will still be generated to provide insight into where there is a lack of code coverage.
- Upon test completion a report will be generated inside of the `coverage` folder found at the project root.
- For a human readable report, open up `coverage/lcov-report/index.html` in your default browser.\
&nbsp;
&nbsp;
#### Combined Coverage File

- To generate a combined coverage file that can be used externally run `npm run coverage:merge`. This will generate a `coverage.json` file in the root of the project.\
&nbsp;
&nbsp;
### Production

To build a minified and optimized production version of the project run `npm run build`.\
&nbsp;
&nbsp;
### Contributing To Project

Please clone this project, run it locally and visit `http://localhost:8080/contribute` for guidelines on how to submit a merge request.
