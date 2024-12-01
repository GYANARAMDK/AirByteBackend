// const OrderModel = require('../Model/OrderModel');

// const OrderPostControler= async(req,res)=>{
//          try {
//             const { Products, shippingAddress, paymentMethod, totalPrice } = req.body;
//             const userId = req.user.id;

//             const NewOrder= new OrderModel({
//                 userid:userId,
//                 products:Products.map((product)=>({
//                     productId:product.productId,
//                     quantity:product.quantity,
//                     price:product.price,
//                 })),
//                 totalPrice:totalPrice,
//                 shippingAddress:shippingAddress,
//                 paymentMethod:paymentMethod,
//             });
//             const savedOrder = await NewOrder.save();
//             res.status(201).json({
//                 message: 'Order placed successfully.',
//                 order: savedOrder
//               });
//          } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: 'Something went wrong while placing the order.' });
//          }
// }

// module.exports=OrderPostControler; 

const razorpay = require('razorpay')
const User = require('../Model/UserModel')
const Order = require('../Model/OrderModel')
const razorpayIntance = require('../razorpayconfig');
const orderpostcontroler = async (req, res) => {

    const userId = req.user.id;
    try {
        const { shippingAddress } = req.body;
        const user = await User.findById(userId).populate('CartArray.productId');
        if (!user || !user.CartArray || user.CartArray.length === 0) {
            return res.status(400).json({ error: 'Cart is empty or invalid userId' });
        }

         // calculate total prize for order
        const totalPrice = user.CartArray.reduce((acc, item) => {
            return acc + (item.price * item.quantity)
        }, 0)

        // create the order in the database
        const orders = new Order({
            userid: userId,
            products: user.CartArray.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            })),
            totalPrice,
            shippingAddress,
            status: 'Pending',
            paymentStatus: 'Pending',
        });

        //save the order in the database
        
        await orders.save();

        //razorpay options 
        const options = {
            totalamount: totalPrice * 100,
            currency: 'INR',
            receipt: `receipt_${orders._id}`,
        }
        const razorpayorder = await new Promise((resolve, reject) => {
            razorpayIntance.orders.create(options, (err, order) => {
                if (err) reject(err);
                else resolve(order);
            });
        });
        res.status(201).json({
            success: true,
            razorpayorder,
            message: 'Order created successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = orderpostcontroler;
