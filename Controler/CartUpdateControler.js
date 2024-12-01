const UserModel = require('../Model/UserModel');

const CartUpdateControler = async (req, res) => {
    try {
        const userid = req.user.id;
        
        const { productId, quantity } = req.body;
        if (quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1.' });
        }
        const user = await UserModel.findById(userid);
        if (!user) {
            return res.status(404).json({ message: 'User or product not found in the cart.' });
        }

        const ProductIdIndex = user.CartArray.findIndex((item) => item.productId.toString() === productId)
        if (ProductIdIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart.' });
        }
        user.CartArray[ProductIdIndex].quantity = quantity;
         await user.save(); 
        res.status(200).json({ message: 'Quantity updated successfully.', cart: user.CartArray });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while updating the cart.' });

    }
}

module.exports = CartUpdateControler;
