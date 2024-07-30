const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");

const URL = "https://dummyjson.com/products";
const DATA_FILE = path.join(__dirname, "../../data/dummyData.json");

async function fetchAndStoreData() {
  try {
    const response = await axios.get(URL);
    await fs.writeFile(DATA_FILE, JSON.stringify(response.data, null, 2));
    console.log("Data fetched and stored successfully");
  } catch (error) {
    console.error("Error fetching or storing data:", error.message);
  }
}

module.exports = { fetchAndStoreData };
