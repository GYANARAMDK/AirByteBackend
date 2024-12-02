const UserModel = require('../Model/UserModel');

const CartGetControler = async (req, res) => {
    try {
        const userid = req.user.id
        
       
        const user = await UserModel.findById(userid).populate({
           path:'CartArray.productId'
        })
        
        if (user.CartArray.length === 0) {
             return res.status(404).json({ message: "cart is empty" });
        }
        return res.status(200).json({
            message: 'Cart retrieved successfully.',
            cart: user.CartArray,
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        return res.status(500).json({ message: 'Something went wrong while fetching the cart.' });

    }



}

module.exports = CartGetControler;
