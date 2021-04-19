const productModel = require('../model/product.model')
const bcrypt = require('bcrypt');
const util = require('util');
const sleep = util.promisify(setTimeout);

module.exports = {

    index: async (req,res)=>{
       /* await sleep(3000);*/
        try {
            productModel.find({},function(error,product){
                if(!error){
                    if(!product) {
                        return res.status(200).json({
                            success: false,
                            message: "Product empty",
                            data: null
                        });
                    }

                    const  data = [];
                    product.forEach(function (item){
                        const itemArray = {
                            "id" : item.id,
                            "name" : item.name,
                            "sku"  : item.sku,
                            "condition" : item.condition,
                            "category"  : item.category,
                            "sub_category" : item.sub_condition,
                            "child_category" :item.child_condition ,
                            "estimate_time"    : item.estimate_shipping_time,
                            "size_name"        :item.size_name,
                            "size_qty"         :item.size_qty,
                            "size_price"       : item.size_price,
                            "whole_sale_qty"        : item.whole_sale_qty,
                            "whole_sale_discount"   : item.whole_sale_discount,
                            "stock"          : item.stock,
                            "description"    : item.description,
                            "return_policy"  : item.return_policy,
                            "address"        : item.address,
                            "city"           : item.city,
                            "country"        : item.country,
                            "postal_code"    : item.postal_code,
                            "image"          : item.image,
                            "price"          : item.price,
                            "youtube_url"    : item.youtube_url,
                            "status"         : item.status

                        }
                        data.push(itemArray);
                    })
                    return res.status(200).json({
                        success: true,
                        message: "Product List",
                        data: data
                    });
                }else{
                    return res.status(500).json({
                        success: true,
                        message: error,
                        data: null
                    });
                }
            });
        }catch (e) {
            res.status(500).json({
                success: false,
                message: e.message,
                data: null
            });
        }
    },
    createProduct:async (req,res)=>{
        try {
            console.log(req);
            const data = {
                 name      : req.body.product_name,
                 sku       : req.body.product_sku,
                 condition : req.body.product_condition,
                 category          : req.body.product_category,
                 sub_category      : req.body.product_sub_category,
                 child_category    : req.body.product_child_category,
                 estimate_shipping_time : req.body.product_shipping_time,
                 size_name        : req.body.product_size,
                 size_qty         : req.body.product_qty,
                 size_price       : req.body.product_size_price,
                 whole_sale_qty        : req.body.product_whole_qty,
                 whole_sale_discount   : req.body.product_whole_discount,
                 stock            : req.body.product_stock,
                 description      : req.body.product_description,
                 return_policy    : req.body.product_return_ploicy,
                 address          : req.body.product_address,
                 city             : req.body.product_city,
                 country          : req.body.product_country,
                 postal_code      : req.body.product_postal_code,
                 image            : req.body.product_image,
                 price            : req.body.product_current_price,
                 youtube_url      : req.body.product_youtube_url,
                 status           : 1,
            };
            await productModel.create(data);
            return res.status(200).json({
                success: true,
                message: "Product created successfully",
                data : data,
            });
        }catch (e){
            return res.status(500).json({
                success: false,
                message: e.message,
                data : null,
            });
        }
    },
    
    changeStatus:async (req,res)=>{
        try{
            const data = {
                status : req.body.status
            }
            await productModel.findByIdAndUpdate(req.body.id,data);
            return res.status(200).json({
                success: true,
                message: "Successfully update status",
                data : null,
            });
        }catch (e) {
            return res.status(500).json({
                success: false,
                message: e.message,
                data : null,
            });
        }
    },

    editProduct: async (req,res) => {
        try{
            console.log(res);
           product =  await productModel.findById(req.body.id);
            return res.status(200).json({
                success: true,
                message: "Edit Product",
                data : product,
            });

        }catch (e){
            return res.status(500).json({
                success: false,
                message: e.message,
                data : null,
            });
        }

    }
    


}
