import slugify from "slugify";
import categoryModel from "../../../DB/model/category.model.js";
import cloudinary from "../../services/cloudinary.js";
import { pagination } from "../../services/pagination.js";
import productModel from "../../../DB/model/product.model.js";

export const getCategories = async (req, res) => {

    const categories = await categoryModel.find().populate('subcategory');

    return res.status(201).json({ message: "success", categories });
}

export const getActiveCategoies = async (req, res) => {
    const { skip, limit } = pagination(req.query.page, req.query.limit);
    const mongooseQuery = categoryModel.find({ status: "Active" });
    const count = await mongooseQuery.clone().countDocuments();
    const categories = await mongooseQuery.skip(skip).limit(limit).select("name image");
    return res.status(200).json({ message: "success", totalCount: count, pageCount: categories.length, categories });
}

export const getSpecificCategory = async (req, res, next) => {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    if (!category) {
        return next(new Error("Category not found", { cause: 404 }));
    }
    return res.status(201).json({ message: "success", category });
}

export const createCategory = async (req, res, next) => {
    const name = req.body.name.toLowerCase();
    const category = await categoryModel.findOne({ name });
    if (category) {
        // return res.status(409).json({ message: "category name already exists" });
        return next(new Error("category name already exists", { cause: 409 }));
    }
    const slug = slugify(name);
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.APP_NAME}/categories`,
    });
    const newCategory = await categoryModel.create({
        name, slug, image: { secure_url, public_id },
        createdBy: req.user.id, updatedBy: req.user.id
    });
    return res.status(201).json({ message: "success", newCategory });
}

export const updateCategory = async (req, res, next) => {

    const { id } = req.params;
    const { name, status } = req.body;
    const category = await categoryModel.findById(id);

    if (!category) {
        return res.status(404).json({ message: `invalid category id ${id} ` });
    }

    if (name) {
        if (await categoryModel.findOne({ name, _id: { $ne: category._id } })) {
            // return res.status(409).json({ message: `category ${name} already exists` });
            return next(new Error(`category ${name} already exists`, { cause: 404 }));
        }
        category.name = name;
        category.slug = slugify(name);
    }
    if (status) {
        category.status = status;
    }

    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/categories` })
        await cloudinary.uploader.destroy(category.image.public_id);
        category.image = { secure_url, public_id };
    }
    category.updatedBy = req.user.id;
    await category.save();

    return res.status(201).json({ message: "success", category });

}

export const deleteCategory = async (req, res, next) => {
    const { categoryId } = req.params;
    const category = await categoryModel.findByIdAndDelete(categoryId);
    if (!category) {
        return next(new Error("Category not found", { cause: 404 }));
    }
    await productModel.deleteMany({ categoryId: categoryId });

    return res.status(200).json({ message: "success", deletedCategory: category });
}