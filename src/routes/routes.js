const express = require("express");

const schoolController = require("../controllers/controller");

const router = express.Router();

router.get("/listschools",schoolController.getSchools);

router.post("/addschool",schoolController.postAddSchool);

module.exports = router;