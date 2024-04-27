const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseController");

// Route to purchase a course
router.post("/purchase-course", purchaseController.purchaseCourse);

module.exports = router;
