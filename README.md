# Node.js Dummy JSON Project

This project fetches dummy JSON data and provides an API to access and filter the data.

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the server

## API Usage

GET /api/products

- Filter by category: ?category=smartphones
- Sort by field: ?sort=price:asc or ?sort=price:desc

Example: http://localhost:3000/api/products?category=smartphones&sort=price:desc
