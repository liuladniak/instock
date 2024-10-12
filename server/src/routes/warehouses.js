import express from "express";
import fs from "fs";
import crypto from "crypto";
import cors from "cors";
import "dotenv/config";
import { check, validationResult } from "express-validator";

import initKnex from "knex";
import configuration from "../../knexfile.js";
const knex = initKnex(configuration);

const router = express.Router();

const getallwarehouses = async (req, res) => {
  try {
    const warehouses = await knex.select("*").from("warehouses");
    res.status(200).json(warehouses);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

router.get("/", getallwarehouses);

const validateWarehouse = [
  check("warehouse_name").notEmpty().withMessage("Warehouse name is required"),
  check("address").notEmpty().withMessage("Address is required"),
  check("city").notEmpty().withMessage("City is required"),
  check("country").notEmpty().withMessage("Country is required"),
  check("contact_name").notEmpty().withMessage("Contact name is required"),
  check("contact_position")
    .notEmpty()
    .withMessage("Contact position is required"),
  check("contact_phone")
    .notEmpty()
    .withMessage("Contact phone is required")
    .matches(/^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/)
    .withMessage("Invalid phone number"),
  check("contact_email")
    .notEmpty()
    .withMessage("Contact email is required")
    .isEmail()
    .withMessage("Invalid email address"),
];

router.post("/", validateWarehouse, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;

  try {
    const [id] = await knex("warehouses").insert({
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    });

    res.status(201).json({
      id,
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", validateWarehouse, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;

  try {
    const id = req.params.id;

    const warehouseExists = await knex("warehouses").where({ id }).first();
    if (!warehouseExists) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    const updatedRows = await knex("warehouses").where({ id }).update({
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    res.status(200).json({
      id,
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const getwarehousebyID = async (req, res) => {
  try {
    const warehouseData = await knex("warehouses").where({
      id: req.params.id,
    });
    if (warehouseData) {
      res.status(200).json(warehouseData);
    } else {
      return res.status(404).json({ message: "Warehouse not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

router.get("/:id", getwarehousebyID);

const getinventorybywarehouseid = async (req, res) => {
  try {
    const warehouseData = await knex("warehouses").where({
      id: req.params.id,
    });
    if (!warehouseData) {
      return res.status(404).json({ message: "Warehouse doesn't exist!" });
    }
    const warehouseInventory = await knex("inventories")
      .where({
        warehouse_id: req.params.id,
      })
      .select("*");

    res.status(200).json(warehouseInventory);
  } catch (err) {
    res.status(404).json({ message: "Internal Server Error" });
  }
};

router.get("/:id/inventories", getinventorybywarehouseid);

const deletewarehouse = async (req, res) => {
  try {
    const warehousefound = await knex("warehouses").where({
      id: req.params.id,
    });
    if (!warehousefound) {
      return res.status(404).json({ message: "Warehouse doesn't exist!" });
    }

    await knex("warehouses").where({ id: req.params.id }).del();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

router.delete("/:id", deletewarehouse);

export default router;
