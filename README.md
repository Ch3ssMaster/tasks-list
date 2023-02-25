# Tasks List (MERN stack)

Task List Full Stack Project, using the MERN stack, where you can add, delete and update tasks. The project is built using the MERN stack, and is deployed on {add link to deployed site}.

## Getting Started

To start with, you need to clone the repository to your local machine. You can do this by running the following command in your terminal:

```bash
git clone https://github.com/Ch3ssMaster/tasks-list
```

### Prerequisites

You need to have the following installed on your machine:

- Node.js
- MongoDB and MongoDB Compass, then create a database called `tasks-list`
- VS Code (optional)

### Installing

To install the dependencies, run the following command in the backend and frontent directories of the project:

```bash
npm install
```

#### Setting up the backend

Create a .env file in the backend directory, and add the following:

```bash
MONGO_URI =  mongodb://localhost:27017/tasks-list
TOKEN_SECRET =  5745cd8ca6d25082500c1de070652c8a8e30f0fa4296d18cb05c4985746e7588
PORT =  8000
```

In case you want to mock tasks for the initial view, run the script:

```bash
npm run mock
```

This will generate a .mongodb file, in the path:

`/backend/scripts/output/`

That you can run with a click from the VS Code plugin playground.

## Running the tests (TODO)

Unit tests have been carried out with the JEST library, both on the front end and on the back end.

### Backend tests

The libraries used for backend testing are:

- [JEST](https://jestjs.io/) - The testing framework used
- [Supertest](https://www.npmjs.com/package/supertest) - The library used to test the API
- [Cross-env](https://www.npmjs.com/package/cross-env) - The library used to set the environment variables

To run the tests, execute the following command:

```bash
npm run test
```

### Style test

Checks if the best practices and the right coding style has been used.

    Give an example

## Deployment (TODO)

Add additional notes to deploy this on a live system

## Built With

- [React](https://reactjs.org/) - The frontend framework used
- [Node.js](https://nodejs.org/en/) - The backend framework used
- [Express](https://expressjs.com/) - The backend framework used
- [MongoDB](https://www.mongodb.com/) - The database used

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code
of conduct, and the process for submitting pull requests to us.

## Versioning

We use [Semantic Versioning](http://semver.org/) for versioning.

## Authors

- **Ch3ssMaster** - _Tasks List_ -
  [Ch3ssMaster](https://github.com/Ch3ssMaster)

## License

This project is licensed under the [MIT License](https://github.com/Ch3ssMaster/tasks-list/blob/main/LICENSE)
