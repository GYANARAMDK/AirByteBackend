const UserModel = require('../Model/UserModel');

const CartAddControler = async (req, res) => {

    try {
        const userid = req.user.id;
    
        const { productId, quantity, price } = req.body;
        const user = await UserModel.findById(userid)
        if (!user) {
            res.status(404).json({ message: "user not found " })
        }
        const productIndex = user.CartArray.findIndex((item) => item.productId.toString() === productId)

        if (productIndex>0) {
            user.CartArray[productIndex].quantity  +=1;
        } else {
            user.CartArray.push({ productId, quantity, price });
        }
        await user.save();
        res.status(200).json({ message: "product added successfully", cart: user.CartArray });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong.', error });
    }

}

module.exports = CartAddControler;