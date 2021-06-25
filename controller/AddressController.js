const addressModel = require('../model/addresses.model')
const verifyToken = require('../helpers/authorization');

module.exports ={

    index:async (request,response) => {
        let sendResponse;
        let data = [];
        try {
            const verify = verifyToken.verifyTokenByUser(request.headers['authorization']);
            if (verify.data === null) {
                sendResponse = response.status(403).json({success: false, message: "Invalid request", data: null,});
            } else {
                console.log(verify.data.id);
                addressModel.find({userId: verify.data.id},function (error,address){
                    if(address.length !== 0){
                        address.forEach(function (item){
                            const  addressList = {
                                "id":item._id,
                                "userId":item.userId,
                                "fullAddress" :item.fullAddress,
                                "houseFlatNo": item.houseFlatNo,
                                "landMark":    item.landMark,
                                "latitude" :   item.latitude,
                                "longitude" :  item.longitude,
                                "type" : item.type,
                            }
                            data.push(addressList);
                        });
                        sendResponse = response.status(200).json({
                            success: true,
                            message: "Address List",
                            data: data,
                        });
                    }else{
                        sendResponse = response.status(200).json({
                            success: true,
                            message: "Address list empty",
                            data: null,
                        });

                    }

                });
            }
        } catch (e) {
            sendResponse = response.status(500).json({
                success: false,
                message: e.message,
                data: null,
            });
        }
        return sendResponse;
    },

    create:async (request,response) =>{
       let sendResponse;

       try{
           const verify  = verifyToken.verifyTokenByUser(request.headers['authorization']);
           if(verify.data === null){
               sendResponse = response.status(403).json({  success: false, message: "Invalid request", data: null, });
           }else{
               console.log(verify);
               const data = {
                   userId : verify.data.id,
                   fullAddress : request.body.fullAddress,
                   houseFlatNo: request.body.houseFlatNo,
                   landMark: request.body.landMark,
                   latitude :  request.body.latitude,
                   longitude : request.body.longitude,
                   type : request.body.type,
               }

               await addressModel.create(data);
               sendresponse = response.status(200).json({
                   success: true,
                   message: "Address created sucessfully ",
                   data: data
               });
           }

       }catch (e) {

           sendResponse = response.status(500).json({
               success: false,
               message: e.message,
               data: null,
           });
       }

       return sendResponse;
    },

    update:async (request,response) => {
        let sendResponse;

        try{
            const verify  = verifyToken.verifyTokenByUser(request.headers['authorization']);
            if(verify.data === null){
                sendResponse = response.status(403).json({  success: false, message: "Invalid request", data: null, });
            }else{

                const getAddress = await addressModel.findById(request.body.id);

                const updateAddress = {
                    fullAddress : request.body.fullAddress ?? getAddress.fullAddress,
                    houseFlatNo: request.body.houseFlatNo ?? getAddress.houseFlatNo,
                    landMark: request.body.landMark ?? getAddress.landMark,
                    latitude :  request.body.latitude ?? getAddress.latitude,
                    longitude : request.body.longitude ?? getAddress.longitude,
                    type : request.body.type ?? getAddress.type,
                }

                await addressModel.findByIdAndUpdate(request.body.id,updateAddress);

                sendresponse = response.status(200).json({
                    success: true,
                    message: "Address upadted sucessfully ",
                    data:updateAddress
                });
            }

        }catch (e) {

            sendResponse = response.status(500).json({
                success: false,
                message: e.message,
                data: null,
            });
        }

        return sendResponse;
    }

}