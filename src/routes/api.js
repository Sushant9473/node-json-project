/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Retrieve a list of products. Can be used to populate a product listing page.
 *     parameters:
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Brand name(s) to filter by (comma-separated for multiple)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category to filter by
 *       - in: query
 *         name: minRating
 *         schema:
 *           type: number
 *         description: Minimum rating to filter by
 *       - in: query
 *         name: price_min
 *         schema:
 *           type: number
 *         description: Minimum price to filter by
 *       - in: query
 *         name: price_max
 *         schema:
 *           type: number
 *         description: Maximum price to filter by
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Field to sort by (e.g., price:asc, rating:desc , discount:asc)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 100
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Product Name"
 *                       brand:
 *                         type: string
 *                         example: "Brand Name"
 *                       category:
 *                         type: string
 *                         example: "Category Name"
 *                       price:
 *                         type: number
 *                         example: 99.99
 *                       rating:
 *                         type: number
 *                         example: 4.5
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error retrieving products"
 *                 details:
 *                   type: string
 *                   example: "Detailed error message"
 */

const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const authenticate = require("../middleware/auth");

router.use(authenticate);

router.get("/products", dataController.getProducts);

module.exports = router;
