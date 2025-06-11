const Razorpay = require('razorpay');
const Order = require('../models/orders');

const createRazorpayOrder = async (amount) => {
    const rzp = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
    return new Promise((resolve, reject) => {
        rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
            if (err) return reject(err);
            resolve(order);
        });
    });
};

const createUserOrder = async (user, orderId) => {
    return await Order.create({ user: user._id, orderid:orderId, status: 'PENDING' });
};

const findOrderById = async (orderId) => {
    return await Order.findOne({ orderid:orderId });
};

const updateOrderStatus = async (order, paymentId, status) => {
    if (paymentId) order.paymentid = paymentId;
    order.status=status;
    return await order.save();
};

const updateUserPremiumStatus = async (user, isPremium) => {
    user.ispremium=isPremium;
    return await user.save();
};

module.exports = {
    createRazorpayOrder,
    createUserOrder,
    findOrderById,
    updateOrderStatus,
    updateUserPremiumStatus
};
