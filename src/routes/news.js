const express = require("express");
const router = express.Router();

const newController = require("../app/controllers/NewController");

//newController.index
//tạo sau pk cho lên trc để load qua

router.get("/:slug", newController.show);

router.get("/", newController.index);

module.exports = router;
