const Product = require('../models/product');

exports.getProductById = async (req, res, next, id) => {
    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(400).json({ error: 'No Product found' });
        }
        req.product = product;
        next();
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Product found' });
    }
};

exports.getProduct = (req, res) => {
    return res.json(req.product);
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Product found' });
    }
}
exports.createProduct = async (req, res) => {
    try {
        req.body.user = req.user._id;
        const product = new Product(req.body)
        const createdProduct = await product.save()
        res.json({ message: 'Product Created Sucessfully', product: createdProduct })
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Product found' });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const product = req.product
        product.title = req.body.title;
        product.description = req.body.description;
        product.price = req.body.price;
        product.discounted_price = req.body.discounted_price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.sizes = req.body.sizes;
        const updatedProduct = await product.save()

        res.json({ message: 'Product Updated Sucessfully', product: updatedProduct })
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Product found' });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = req.product
        await product.deleteOne()
        res.json({ message: 'Product Deleted Sucessfully' })
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Product found' });
    }
}