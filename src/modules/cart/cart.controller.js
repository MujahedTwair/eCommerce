import cartModel from "../../../DB/model/cart.model.js";

export const createCart = async (req, res) => {

    const { productId, quantity } = req.body;

    const cart = await cartModel.findOne({ userId: req.user.id });
    if (!cart) {
        const newCart = await cartModel.create({
            userId: req.user.id,
            products: { productId, quantity }
        });
        return res.status(201).json({ message: "succrss: new cart created", newCart });
    }
    let isFoundProduct = false;
    for (const product of cart.products) {
        if (product.productId == productId) {
            product.quantity = quantity;
            isFoundProduct = true;
            break;
        }
    }
    if (!isFoundProduct) {
        cart.products.push({ productId, quantity });
    }

    await cart.save();

    return res.status(404).json({ message: "success: cart exists(updated)", cart });

}

export const removeItem = async (req, res) => {
    const { productId } = req.body;

    const updatedCart = await cartModel.findOneAndUpdate({ userId: req.user.id }, {
        $pull: {
            products: {
                productId
            }
        }
    }, { new: true });
    return res.status(200).json({ message: "success", updatedCart });
}

export const clear = async (req, res) => {
    const clearedCart = await cartModel.findOneAndUpdate({ userId: req.user.id }, {
        products: []
    }, { new: true });

    return res.status(200).json({ message: "success", clearedCart });
}

export const getCart = async (req, res) => {
    const cart = await cartModel.findOne({ userId: req.user.id });

    return res.status(201).json({ message: "success", cart: cart.products });
}