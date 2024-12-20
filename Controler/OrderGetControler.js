const mongoose = require('mongoose');
const OrderModel = require('../Model/OrderModel');

const OrderGetControler = async (req, res) => {
    try {
        const userid = req.user.id;
        const Orders = await OrderModel.aggregate([{ $match: { userid: new mongoose.Types.ObjectId(userid) } },
        {
            $lookup: {
                from: 'users',
                localField: 'userid',
                foreignField: '_id',
                as: "userDetails"
            }
        },

             { $unwind: { path: '$userDetails' } },
            {
                $project: {
                    _id: 1,
                    products: 1,
                    totalPrice: 1,
                    shippingAddress: 1,
                    status: 1,
                    createdAt: 1,
                     orderDate:1,
                    paymentStatus:1,
                    user: {
                        name: '$userDetails.name',

                        phone: '$userDetails.phone',
                    },
                },
            },
        ])
        if (Orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }
        res.status(200).json(Orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while fetching orders.' });
    }

}
module.exports = OrderGetControler;
