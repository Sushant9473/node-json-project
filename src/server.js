const express = require("express");
const apiRoutes = require("./routes/api");
const { fetchAndStoreData } = require("./utils/dataFetcher");

const { swaggerUi, specs } = require("./swagger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await fetchAndStoreData();
});
