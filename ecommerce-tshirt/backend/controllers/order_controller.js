const Order = require('../models/order');

exports.getOrderById = async (req, res, next, id) => {
    try {
        const order = await Order.findById(id)
        if (!order) {
            return res.status(400).json({ error: 'No order found' });
        }
        req.order = order;
        next();
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Order found' });
    }
};

exports.getOrderForPayment = async (req, res, next) => {
    try {
        const order = await Order.findById(req.body.oid)
        if (!order) {
            return res.status(400).json({ error: 'No order found' });
        }
        order.status = "paid and processing"
        const updatedOrder = await order.save()
        req.order = updatedOrder;
        next();
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Order found' });
    }
};


exports.createOrder = async (req, res) => {
    try {
        req.body.user = req.user._id;
        let amount = 0;
        for (const product of req.body.products) {
            console.log(product);
            amount += product.quantity * product.product.discounted_price
        }
        req.body.amount = amount
        console.log(req.body);
        const order = new Order(req.body);
        const createdOrder = await order.save()
        res.json({ message: "Order Created Sucessfully", order: createdOrder });
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Orders found' });
    }

};

exports.getAllOrders = async (req, res) => {
    try {
        let filter = {}
        if (req.user.role !== 1) {
            filter = { user: req.user._id }
        }
        const brands = await Order.find(filter)
        res.json(brands);
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Orders found' });
    }
};

exports.updateOrder = async (req, res) => {
    try {

        const order = req.order
        order.status = req.body.status;

        const updatedOrder = await order.save();

        res.json({ message: 'Order Updated Sucessfully', order: updatedOrder })
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Order found' });
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const order = req.order
        await order.deleteOne()
        res.json({ message: 'Order Deleted Sucessfully' })
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No Order found' });
    }
}