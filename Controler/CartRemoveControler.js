const UserModel = require('../Model/UserModel');

const CartRemoveControler = async (req, res) => {
    try {
        const userid = req.user.id;
        const { productId } = req.body;
        const user = await UserModel.findByIdAndUpdate(userid,
            { $pull: { CartArray: { productId } } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({
            message: 'Product removed from cart successfully.',
            cart: user.CartArray, // Return the updated cart
        });
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        res.status(500).json({ message: 'Something went wrong while removing the product.' });

    }
}

module.exports = CartRemoveControler;