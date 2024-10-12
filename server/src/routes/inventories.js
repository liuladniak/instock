import express from "express";
import { check, validationResult } from "express-validator";
import "dotenv/config";

// Creating a knex connection
import initKnex from "knex";
import configuration from "../../knexfile.js";

const knex = initKnex(configuration);

const router = express.Router();

// Get list of all inventory items
const getAllInventories = async (req, res) => {
  try {
    const inventories = await knex("inventories")
      .select(
        "inventories.id",
        "warehouses.warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      )
      .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id");

    res.status(200).json(inventories);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single inventory item
const getInventoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await knex("inventories")
      .select(
        "inventories.id",
        "warehouses.warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      )
      .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
      .where("inventories.id", id)
      .first();

    if (!inventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

router.get("/", getAllInventories);
router.get("/:id", getInventoryById);

const deleteinventory = async (req, res) => {
  try {
    const inventoryfound = await knex("inventories").where({
      id: req.params.id,
    });
    if (!inventoryfound) {
      return res.status(404).json({ message: "  This item doesn't exist!" });
    }

    await knex("inventories").where({ id: req.params.id }).del();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

router.delete("/:id", deleteinventory);

const validateInventory = [
  check("warehouse_id")
    .notEmpty()
    .withMessage("Warehouse ID is required")
    .bail()
    .isInt()
    .withMessage("Warehouse ID must be an integer")
    .custom(async (value) => {
      const warehouseExists = await knex("warehouses")
        .where({ id: value })
        .first();
      if (!warehouseExists) {
        return Promise.reject("Warehouse ID does not exist");
      }
    }),
  check("item_name").notEmpty().withMessage("Item name is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("category").notEmpty().withMessage("Category is required"),
  check("status").notEmpty().withMessage("Status is required"),
  check("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .bail()
    .isInt()
    .withMessage("Quantity must be a number"),
];

router.post("/", validateInventory, async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { warehouse_id, item_name, description, category, status, quantity } =
    req.body;

  try {
    const [id] = await knex("inventories").insert({
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity: parseInt(quantity, 10),
    });

    res.status(201).json({
      id,
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity: parseInt(quantity, 10),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", validateInventory, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { warehouse_id, item_name, description, category, status, quantity } =
    req.body;

  const id = req.params.id;

  try {
    const inventoryExists = await knex("inventories").where({ id }).first();
    if (!inventoryExists) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    const updatedRows = await knex("inventories")
      .where({ id })
      .update({
        warehouse_id,
        item_name,
        description,
        category,
        status,
        quantity: parseInt(quantity, 10),
      });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.status(200).json({
      id,
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity: parseInt(quantity, 10),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
