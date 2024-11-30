const Productmodel = require('../Model/ProductModel')


const ProductGetControler = async (req, res) => {

    try {
        const products = await Productmodel.find();
        res.status(200).json({ message: 'Cart retrieved successfully.', product: products })

    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Something went wrong while fetching the products' });

    }
}

module.exports=ProductGetControler;