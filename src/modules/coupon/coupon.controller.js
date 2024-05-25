import couponModel from "../../../DB/model/coupon.model.js";

export const createCoupon = async (req, res, next) => {
    const { name } = req.body;
    req.body.expireDate = new Date(req.body.expireDate);
    if (await couponModel.findOne({ name })) {
        // return res.status(409).json({ message: "coupon name already exists" });
        return next(new Error("coupon name already exists", { cause: 409 }));
    }
    req.body.createdBy = req.user.id;
    req.body.updatedBy = req.user.id;
    const coupon = await couponModel.create(req.body);
    return res.status(201).json({ message: "success", coupon });
}

export const getCoupons = async (req, res) => {
    const coupons = await couponModel.find({ isDeleted: false });
    return res.status(200).json({ message: "success", coupons });
}

export const updateCoupon = async (req, res, next) => {
    const coupon = await couponModel.findById(req.params.id);
    if (!coupon) {
        // return res.status(404).json({ message: 'coupon not found' });
        return next(new Error("coupon not found", { cause: 404 }));
    }
    if (req.body.name) {
        if (await couponModel.findOne({ name: req.body.name }).select('name')) {
            // return res.status(409).json({ message: `coupon ${req.body.name} already exists` });
            return next(new Error(`coupon ${req.body.name} already exists`, { cause: 409 }));
        }
        coupon.name = req.body.name;
    }
    if (req.body.amount) {
        coupon.amount = req.body.amount;
    }
    await coupon.save();
    return res.status(200).json({ message: "success", coupon });
}

export const softDelete = async (req, res, next) => {
    const { id } = req.params;
    const coupon = await couponModel.findOneAndUpdate({ _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true });
    if (!coupon) {
        // return res.status(400).json({ message: "can't delete this coupon" });
        return next(new Error("can't delete this coupon", { cause: 400 }));
    }
    return res.status(200).json({ message: "success" });
}

export const hardDelete = async (req, res, next) => {
    const { id } = req.params;
    const coupon = await couponModel.findOneAndDelete({ _id: id });
    if (!coupon) {
        // return res.status(400).json({ message: "can't delete this coupon" });
        return next(new Error("can't delete this coupon", { cause: 400 }));
    }
    return res.status(200).json({ message: "success" });
}

export const restore = async (req, res, next) => {
    const { id } = req.params;
    const coupon = await couponModel.findOneAndUpdate({ _id: id, isDeleted: true },
        { isDeleted: false },
        { new: true });
    if (!coupon) {
        // return res.status(400).json({ message: "can't restore this coupon" });
        return next(new Error(`can't restore this coupon`, { cause: 400 }));
    }
    return res.status(200).json({ message: "success" });
}

