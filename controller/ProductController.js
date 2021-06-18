const productModel = require('../model/product.model')

module.exports = {

    //fetch Product
    index: async (req, res) => {
        try {

            const searchKeyword = req.params.keyword;
            let sendResponse;
            const data = [];

            const page = req.query.page;
            const limit = req.query.limit;

            const startIndex = (page -1) * limit;
            const endIndex = page *limit;



            if(searchKeyword !== undefined){
                productModel.find({$or:[{name:req.params.keyword},{sku:req.params.keyword},{price:req.params.keyword}]}, function (error, product) {
                    if (!error) {
                        if (product.length === 0) {
                            sendResponse = res.status(200).json({
                                success: true,
                                message: "No match found",
                                data: null
                            });
                        }else{
                            product.forEach(function (item) {
                                const itemArray = {
                                    "id": item.id,
                                    "name": item.name,
                                    "sku": item.sku,
                                    "condition": item.condition,
                                    "category": item.category,
                                    "sub_category": item.sub_condition,
                                    "child_category": item.child_condition,
                                    "estimate_time": item.estimate_shipping_time,
                                    "size_name": item.size_name,
                                    "size_qty": item.size_qty,
                                    "size_price": item.size_price,
                                    "whole_sale_qty": item.whole_sale_qty,
                                    "whole_sale_discount": item.whole_sale_discount,
                                    "stock": item.stock,
                                    "description": item.description,
                                    "return_policy": item.return_policy,
                                    "address": item.address,
                                    "city": item.city,
                                    "country": item.country,
                                    "postal_code": item.postal_code,
                                    "image": item.image,
                                    "price": item.price,
                                    "youtube_url": item.youtube_url,
                                    "status": item.status

                                }
                                data.push(itemArray);
                            })

                            sendResponse = res.status(200).json({
                                success: true,
                                message: "Product List",
                                data: data
                            });
                        }

                    }else {
                        sendResponse = res.status(500).json({
                            success: true,
                            message: error,
                            data: null
                        });
                    }
                });
            }
            else{
                productModel.find({}, function (error, product) {
                    if (!error) {
                        if (!product) {
                            sendResponse = res.status(200).json({
                                success: true,
                                message: "Product empty",
                                data: null
                            });
                        }else{
                            product.forEach(function (item) {
                                const itemArray = {
                                    "id": item.id,
                                    "name": item.name,
                                    "sku": item.sku,
                                    "condition": item.condition,
                                    "category": item.category,
                                    "sub_category": item.sub_condition,
                                    "child_category": item.child_condition,
                                    "estimate_time": item.estimate_shipping_time,
                                    "size_name": item.size_name,
                                    "size_qty": item.size_qty,
                                    "size_price": item.size_price,
                                    "whole_sale_qty": item.whole_sale_qty,
                                    "whole_sale_discount": item.whole_sale_discount,
                                    "stock": item.stock,
                                    "description": item.description,
                                    "return_policy": item.return_policy,
                                    "address": item.address,
                                    "city": item.city,
                                    "country": item.country,
                                    "postal_code": item.postal_code,
                                    "image": item.image,
                                    "price": item.price,
                                    "youtube_url": item.youtube_url,
                                    "status": item.status

                                }
                                data.push(itemArray);
                            });

                            sendResponse =  res.status(200).json({
                                success: true,
                                message: "Product List",
                                data:  data.slice(startIndex,endIndex),
                                totalPageCount:data.length
                            });
                        }

                    } else {
                        sendResponse =  res.status(500).json({
                            success: true,
                            message: error,
                            data: null
                        });
                    }
                });
            }

            return sendResponse;
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message,
                data: null
            });
        }
    },

    //Craete Product
    createProduct: async (req, res) => {
        try {

            const data = {
                name: req.body.name,
                sku: req.body.sku,
                condition: req.body.condition,
                category: req.body.category,
                sub_category: req.body.sub_category,
                child_category: req.body.child_category,
                estimate_shipping_time: req.body.estimate_shipping_time,
                size_name: req.body.size_name,
                size_qty: req.body.size_qty,
                size_price: req.body.size_price,
                whole_sale_qty: req.body.whole_sale_qty,
                whole_sale_discount: req.body.whole_sale_discount,
                stock: req.body.stock,
                description: req.body.description,
                return_policy: req.body.return_policy,
                address: req.body.address,
                city: req.body.city,
                country: req.body.country,
                postal_code: req.body.product_postal_code,
                image: req.file.originalname,
                price: req.body.price,
                youtube_url: req.body.youtube_url,
                status: 1,
            };
            await productModel.create(data);
            return res.status(200).json({
                success: true,
                message: "Product created successfully",
                data: data,
            });
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message,
                data: null,
            });
        }
    },

    // Change Status
    changeStatus: async (req, res) => {
        try {
            const data = {
                status: req.body.status
            }
            await productModel.findByIdAndUpdate(req.body.id, data);
            return res.status(200).json({
                success: true,
                message: "Successfully update status",
                data: null,
            });
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message,
                data: null,
            });
        }
    },

    //get Edit Product
    getProduct: async (req, res) => {
        try {
            const product = await productModel.findById(req.params.id);
            return res.status(200).json({
                success: true,
                message: "Edit Product",
                data: product,
            });
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message,
                data: null,
            });
        }

    },

    //save Edit
    editProduct: async (req, res) => {
        try {

            console.log(req.body.image);
            console.log(req.file);
            const product = await productModel.findById(req.params.id);
            product.name = req.body.name;
            product.sku = req.body.sku;
            product.condition = req.body.condition;
            product.category = req.body.category;
            product.sub_category = req.body.sub_category;
            product.child_category = req.body.child_category;
            product.estimate_shipping_time = req.body.estimate_shipping_time;
            product.size_name = req.body.size_name;
            product.size_qty = req.body.size_qty;
            product.size_price = req.body.size_price;
            product.whole_sale_qty = req.body.whole_sale_qty;
            product.whole_sale_discount = req.body.whole_sale_discount;
            product.stock = req.body.stock;
            product.description = req.body.description;
            product.return_policy = req.body.return_policy;
            product.address = req.body.address;
            product.city = req.body.city;
            product.country = req.body.country;
            product.postal_code = req.body.postal_code;
            product.image = req.file ? req.file.originalname : req.body.image;
            product.price = req.body.price;
            product.youtube_url = req.body.youtube_url;
            product.status = 1;

            product.save();

            const updatedProduct = await productModel.findById(req.params.id);

            return res.status(200).json({
                success: true,
                message: "Product update successfully",
                data: updatedProduct,
            });
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message,
                data: null,
            });
        }
    },

}
