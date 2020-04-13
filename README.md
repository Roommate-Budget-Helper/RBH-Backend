# Roommate-Budget-Helper

This is the backend for the web application: Roommate-Budget-Helper. The website provides a platform for roommates with frequent external bills (water bill, electricity bill, rent, etc.) that they have the need to share them in a complex way, record the share plan. and keep track of evidence of payments and internal balance. 
The site is currently hosted on heroku: https://roommate-budget-helper.herokuapp.com/
The backend is also hosted on heroku: https://roommate-budget-helper-api.herokuapp.com/api
The backend also contains the NPM package: rbh-api-service, hosted by [npm](https://www.npmjs.com/package/rbh-api-service)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need NPM and Typescript to run this backend service application on your local machine

### Installing

To install the application:

```
npm i
npm update
```

## Running the tests

To test the services of the application

```
npm test
```

## Built With

* [Typescript](https://www.typescriptlang.org/) - The language used
* [Express](https://www.expressjs.com/) - The framework used
* [NPM](https://www.npmjs.com/) - Dependency manager

## Contributing

If you want to contribute to the package or the code, please create a pull request with detailed description on the changes in polite languages.

## Versioning

The package version for rbh-api-service is currently 1.9.0

## Authors

* **Team 2** - *Initial work* - [contributors](https://github.com/Roommate-Budget-Helper/RBH-Frontend/graphs/contributors)

# HOW TO create a DATABASE mirror and load the schema with data:
  1. Download and install the Microsoft SSMS studio(https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15) or Visual Studio with Sql database package. (https://visualstudio.microsoft.com/downloads/)
  2. Clone the .bacpac file from git to local.
  3. Run SSMS/VS and create a database with DBname "Roommate". Config the auth and storage features as you wish.
  4. Select the database and rightclick, choose task->Upgrade Data-Tier App and you will see its Wizard pop up.
  5. Click next and select your local DAC package then click next. 
  6. Config the option section according to you own database/server setup(Normally the default setup works fine)
