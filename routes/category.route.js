const express = require('express');
const { getAllCatergoriesHandler, postCategoryHandler, getCategoryHandler } = require('../controllers/category.controller');
const router = express.Router();


router.route("/").get(getAllCatergoriesHandler).post(postCategoryHandler);

router.get(":/categoryId", getCategoryHandler)
module.exports = router