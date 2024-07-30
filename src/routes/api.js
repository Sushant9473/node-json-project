/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort by field (e.g., price:asc)
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       price:
 *                         type: number
 */

const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const authenticate = require("../middleware/auth");

router.use(authenticate);

router.get("/products", dataController.getProducts);

module.exports = router;
