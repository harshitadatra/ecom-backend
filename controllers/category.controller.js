const Category = require("../models/catergory.model");
const getAllCatergoriesHandler = async (req, res) => {
    try {
        const categories = [];
        categories = await Category.findOne({});
        return res.status(200).json({})
    }
    catch (e) {
        return res.status(500).json({
            message: "Cannot find Categories.Please try again later!"
        })
    }
}
const getCategoryHandler = async (req, res) => {
    try {
        const categoryId = req.params;
        const catergory = await Category.findById({ categoryId });;
        return res.status(200).json({ catergory })
    }
    catch (e) {
        return res.status(500).json({
            message: "Cannot find category with give id"
        })
    }
}
const postCategoryHandler = async (req, res) => {
    try {
        const { data } = req.body;
        await Category.insertMany(data);
        const categories = await Category.find({})
        return res.status(201).json({
            categories
        })
    }
    catch (e) {
        return res.status(500).json({
            message: "Could not add catefories.Please try again later"
        })
    }
}

module.exports = { getAllCatergoriesHandler, getCategoryHandler, postCategoryHandler }
