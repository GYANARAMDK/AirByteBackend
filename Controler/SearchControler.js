const ProductModel=require('../Model/ProductModel')
const SearchControler = async (req, res) => {
    try {
        const { keyword, category, minPrice, maxPrice } = req.query;
        let query = {};
        if (keyword) {
            query.$or = [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ];
        }
        if (category) {
            query.category = category;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }
        const products = await ProductModel.find(query);
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error occurred while searching for products.' });

    }
}

module.exports = SearchControler;