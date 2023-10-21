import categoryRouter from './category/category.router.js';
import productRouter from './product/product.router.js';


const initApp = (app, express) => {
    app.use(express.json())
    app.use('/category', categoryRouter);
    app.use('/product', productRouter);
    app.get('/', (req, res) => res.status(200).json({ message: "welcome" }));
    app.use('*', (req, res) => res.status(500).json({ message: "Page not found" }));
}

export default initApp;