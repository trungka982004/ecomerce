const ProductService = require('../services/ProductService')

const createProduct = async (req,res) => {
    try {
        const {name, image, type, price, countInStock, rating, desc} = req.body
        if(!name || !image || !type || !price || !countInStock || !rating){
            return res.status(200).json({
                status:'ERR',
                message: 'The input is required'
            })
        }
        
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;

        // Check if productId is provided
        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The productId is required'
            });
        }

        // Call the service to update the product
        const response = await ProductService.updateProduct(productId, data);

        // Check if the update was successful
        if (!response) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Product not found'
            });
        }

        // Send the response
        return res.status(200).json(response);
    } catch (e) {
        // Handle unexpected errors
        console.error(e);  // Log the error for debugging
        return res.status(500).json({
            status: 'ERR',
            message: 'An error occurred while updating the product'
        });
    }
};

const getDetailProduct = async (req,res) => {
    try {
        const productId = req.params.id
        //const token = req.headers
        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.getDetailProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteProduct = async (req,res) => {
    try {
        const productId = req.params.id
        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllProduct = async (req,res) => {    
    try {
        const {limit, page, sort, filter} = req.query
        const response = await ProductService.getAllProduct(Number(limit) || 8 , Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct
}