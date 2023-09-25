const Cart = require('../models/cart');

exports.getCartById = async (req, res, next, id) => {
    try {
        const cart = await Cart.findById(id)
        if (!cart) {
            return res.status(400).json({ error: 'No Cart found' });
        }
        req.cart = cart;
        next();
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Cart found' });
    }
};

exports.getCart = (req, res) => {
    return res.json(req.cart);
}

exports.getAllUserCarts = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('products.product')
        res.json(cart)
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Cart found' });
    }
}
exports.addToCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id })
        if (!cart) {
            cart = new Cart({ user: req.user._id, products: [] })
        }
        const existingProductIndex = cart.products.
            findIndex(product => product.product.toString() === req.body.product)

        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += 1
        } else {
            cart.products.push({ product: req.body.product, quantity: 1 })
        }

        const createdCart = await cart.save()
        res.json({ message: 'Added To Cart Created Sucessfully', cart: createdCart })
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Cart found' });
    }
}

exports.createOrUpdateCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id })
        if (cart) {
            cart.products = req.body.products;
        } else {
            cart = new Cart(req.body)
        }
        const updatedCart = await cart.save()

        res.json({ message: 'Cart Updated Sucessfully', cart: updatedCart })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err?.message || 'No Cart found' });
    }
}

exports.deleteCart = async (req, res) => {
    try {
        const cart = req.cart
        await cart.deleteOne()
        res.json({ message: 'Cart Deleted Sucessfully' })
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Cart found' });
    }
}