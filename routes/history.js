const express = require("express");
const { create, get } = require("../controllers/history");
const router = express.Router();

// api/history/create
router.post("/create", create);

// api/history/get
router.get("/get", get);

module.exports = router;
