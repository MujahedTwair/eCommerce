import slugify from "slugify";
import categoryModel from "../../../DB/model/category.model.js";
import cloudinary from "../../services/cloudinary.js";

export const getCategories = (req, res) => {
    return res.json('categories...');
}

export const createCategory = async (req, res) => {
    const name = req.body.name.toLowerCase();
    const category = await categoryModel.findOne({ name });
    if (category) {
        return res.status(409).json({ message: "category name already exists" });
    }
    const slug = slugify(name);
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.APP_Name}/categories`,
    });
    const newCategory = await categoryModel.create({ name, slug, image: { secure_url, public_id } });
    return res.status(201).json({ message: "success", newCategory });
}