import connectDB from '../../DB/connection.js';
import categoryRouter from './category/category.router.js';
import productRouter from './product/product.router.js';
import authRouter from './auth/auth.router.js';
import subcategoryRouter from './subcategory/subcategory.router.js';
import couponRouter from './coupon/coupon.router.js'
import cartRouter from './cart/cart.router.js'

const initApp = (app, express) => {
    app.use(express.json());
    connectDB();
    app.use('/category', categoryRouter);
    app.use('/product', productRouter);
    app.use('/auth', authRouter);
    app.use('/subcategory', subcategoryRouter);
    app.use('/coupon', couponRouter);
    app.use('/cart', cartRouter);
    app.get('/', (req, res) => res.status(200).json({ message: "welcome" }));
    app.use('*', (req, res) => res.status(500).json({ message: "Page not found" }));
}

export default initApp;