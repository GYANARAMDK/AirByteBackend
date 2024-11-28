const OrderModel = require('../Model/OrderModel');

const OrderPostControler= async(req,res)=>{
         try {
            const { Products, shippingAddress, paymentMethod, totalPrice } = req.body;
            const userId = req.user.id;
         
            const NewOrder= new OrderModel({
                userid:userId,
                products:Products.map((product)=>({
                    productId:product.productId,
                    quantity:product.quantity,
                    price:product.price,
                })),
                totalPrice:totalPrice,
                shippingAddress:shippingAddress,
                paymentMethod:paymentMethod,
            });
            const savedOrder = await NewOrder.save();
            res.status(201).json({
                message: 'Order placed successfully.',
                order: savedOrder
              });
         } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong while placing the order.' });
         }
}

module.exports=OrderPostControler;