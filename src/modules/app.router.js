import cors from "cors";
import connectDB from '../../DB/connection.js';
import categoryRouter from './category/category.router.js';
import productRouter from './product/product.router.js';
import authRouter from './auth/auth.router.js';
import subcategoryRouter from './subcategory/subcategory.router.js';
import couponRouter from './coupon/coupon.router.js';
import orderRouter from './order/order.router.js';
import cartRouter from './cart/cart.router.js';
import userRouter from './user/user.router.js';
import { globalErrorHandler } from '../services/errorHandling.js';

const initApp = (app, express) => { 
    /*
    const whitelist = ['https://657b90b77b133600858610a1--zippy-palmier-741b4e.netlify.app', 'http://example2.com'];
    const corsOptions = {
        origin: function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    };
    app.use(cors(corsOptions));*/
    /*
    app.use((req, res, next) => {
        let whitelist = ['https://www.mujahed.com'];
        if (!whitelist.includes(req.headers['origin'])) {
            return next(new Error('Not allowed by my cors', { cause: 404 })); 
        }
        next();
    })*/
    app.use(cors())
    app.use(express.json());
    connectDB();
    app.use('/category', categoryRouter);
    app.use('/product', productRouter);
    app.use('/auth', authRouter);
    app.use('/subcategory', subcategoryRouter);
    app.use('/coupon', couponRouter);
    app.use('/cart', cartRouter);
    app.use('/order', orderRouter);
    app.use('/user', userRouter);
    app.get('/', (req, res) => res.status(200).json({ message: "welcome" }));
    app.use('*', (req, res) => res.status(500).json({ message: "Page not found" }));

    app.use(globalErrorHandler);
}

export default initApp;