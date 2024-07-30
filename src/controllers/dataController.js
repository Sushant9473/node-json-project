const fs = require("fs").promises;
const path = require("path");
const cache = require("../utils/cache");

const DATA_FILE = path.join(__dirname, "../../data/dummyData.json");

exports.getProducts = async (req, res) => {
  const cacheKey = `products_${JSON.stringify(req.query)}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    // console.log(`Cache hit for key: ${cacheKey}`);
    return res.json(cachedData);
  }

  //   console.log(`Cache miss for key: ${cacheKey}`);
  try {
    const data = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));
    let products = data.products;

    // Filtering
    if (req.query.category) {
      products = products.filter(
        (p) => p.category.toLowerCase() === req.query.category.toLowerCase()
      );
    }

    if (req.query.brand) {
      const brands = req.query.brand
        .split(",")
        .map((b) => b.trim().toLowerCase());
      products = products.filter((p) => {
        if (p.brand && typeof p.brand === "string") {
          const productBrand = p.brand.toLowerCase();
          const result = brands.includes(productBrand);
          return result;
        }
        return false;
      });
    }

    // Rating filtering
    if (req.query.minRating) {
      const minRating = parseFloat(req.query.minRating);
      products = products.filter((p) => {
        if (p.rating && typeof p.rating === "number") {
          return p.rating >= minRating;
        }
        return false;
      });
    }

    // Advanced Filtering
    if (req.query.price_min) {
      products = products.filter(
        (p) => p.price >= parseFloat(req.query.price_min)
      );
    }
    if (req.query.price_max) {
      products = products.filter(
        (p) => p.price <= parseFloat(req.query.price_max)
      );
    }

    // Sorting
    if (req.query.sort) {
      const [field, order] = req.query.sort.split(":");
      products.sort((a, b) => {
        let comparison = 0;
        switch (field) {
          case "price":
            comparison = a.price - b.price;
            break;
          case "rating":
            comparison = a.rating - b.rating;
            break;
          case "discount":
            // Assuming discount is stored as a percentage
            comparison = a.discountPercentage - b.discountPercentage;
            break;
          default:
            // If an unknown field is provided, don't sort
            return 0;
        }
        return order === "desc" ? -comparison : comparison;
      });
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, products.length);

    const results = {
      total: products.length,
      onPage: page,
      limit,
      totalPages: Math.ceil(products.length / limit),
      data: products.slice(startIndex, endIndex),
    };

    cache.set(cacheKey, results);
    res.json(results);
  } catch (error) {
    console.error("Error in getProducts:", error);
    res.status(500).json({ error: "Error retrieving products" });
  }
};
