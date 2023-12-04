const express = require("express");
const { auth } = require("../utils/auth");
const toyController = require("../controllers/toy.controller");

const router = express.Router();


router.get("/", toyController.getToys);
router.get("/search", toyController.getToysByNameInfo);
router.get("/category/:catname", toyController.getToysByCategory);
router.get("/single/:id", toyController.getToyById);

// actions for useres:
router.post("/", auth(), toyController.addToy);
router.put("/:editId", auth(), toyController.editToy);
router.delete("/:delId", auth(), toyController.deleteToy);

module.exports = router;