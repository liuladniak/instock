import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import warehouseRoutes from "./src/routes/warehouses.js";
import inventoryRoutes from "./src/routes/inventories.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.use("/api/warehouses", warehouseRoutes);
app.use("/api/inventories", inventoryRoutes);

/*
app.get("/", (req, res) => {
  res.send("Welcome to the server");
});
*/

app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(port, () => {
  console.log(`🚀 Listening on port ${port}`);
});
