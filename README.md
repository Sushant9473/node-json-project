# Node.js Dummy JSON Project

This project fetches dummy JSON data and provides an API to access and filter the data.

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the server
4. For the first request, you need to authenticate by providing the username = `admin` and the password = `password`.

## Features

### API Endpoints

- **GET /api/products**
  - Fetch all products.
  - **Filter by category**: `?category=beauty`
  - **Sort by field**: `?sort=price:asc` or `?sort=rating:asc` or `?sort=discount:desc`
  - Example: `http://localhost:3000/api/products?category=beauty&sort=price:desc`

### Authentication

- **Middleware**: [`auth`](src/middleware/auth.js)
  - Used to authenticate requests.
  - Example usage in routes: [`authenticate`](src/routes/api.js)
  - Username - admin
  - Password - password

### Caching

- **Cache Utility**: [`NodeCache`](src/utils/cache.js)
  - Used to cache data for improved performance.
  - Example usage in controller: [`cache`](src/controllers/dataController.js)

### Data Fetching

- **Data Fetcher Utility**: [`dataFetcher`](src/utils/dataFetcher.js)
  - Fetches data from external sources.

### Swagger Documentation

- **Swagger Setup**: [`swagger.js`](src/swagger.js)
  - Provides API documentation using Swagger.
  - Accessible at: `http://localhost:3000/api-docs`

### Testing

- **Unit Tests**: [`api.test.js`](src/tests/api.test.js)
  - Uses Jest and Supertest for testing API endpoints.
  - Run tests with: `npm test`

## API Usage

- You can either run the server and visit [Swagger UI](http://localhost:3000/api-docs) to interact with the API requests.
  <img src="./assets/Screenshot%202024-08-01%20at%201.08.32 AM.jpg" alt="API Documentation Screenshot" width="700">




- You can also view the complete API documentation on [Postman Docs](https://documenter.getpostman.com/view/13304285/2sA3kd9cgP).  
  <img src="./assets/Screenshot%202024-08-01%20at%201.15.06 AM.jpg" alt="API Documentation Screenshot" width="700">
