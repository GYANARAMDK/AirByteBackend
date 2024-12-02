const razorpay = require('razorpay');
const Order = require('../Model/OrderModel');
const User = require('../Model/UserModel');
const crypto = require('crypto');
const razorpayInstance = require('../razorpayconfig');

const OrderVerifyControler = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

        if (!order) {
            return res.status(400).json({ error: 'Invalid order ID' });
        }
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        
        const expectedSignature = crypto.createHmac('sha256', '17H2Uwcg5mxGUAXFvLfr30kE')
            .update(body)
            .digest('hex');

        // verify it this process valid or not 
        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ error: 'Invalid payment signature' });
        }
        order.paymentStatus = "paid"
        order.status = "Shipped"
        await order.save();

        const user = await User.findById(order.userid)
        user.CartArray = [];
        await user.save();


        res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            order: order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}

module.exports = OrderVerifyControler;
