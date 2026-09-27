import Product from "../models/Product.js";

// POST /api/products
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

// GET /api/products - with filtering, sorting, pagination
export const getAllProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, sortBy, page = 1, limit = 10 } = req.query

        const filter = {};
        if (category) filter.category = category;

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        let query = Product.find(filter);
        if (sortBy === 'price_asc') query = query.sort({ price: 1 });
        if (sortBy === 'price_desc') query = query.sort({ price: -1 });

        const pageNum = Math.max(Number(page) || 1, 1);
        const limitNum = Math.max(Number(limit) || 10, 1);
        query = query.skip((pageNum - 1) * limitNum).limit(limitNum);

        const products = await query
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

