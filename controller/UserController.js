const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken');
const tokenSecretKey = '!!@$%anGularAdmin@$%!!';
const verifyToken = require('../helpers/authorization');
const addressModel = require('../model/addresses.model')


module.exports = {
    userRegistration : async (request,response) =>{
        let  sendresponse;
        try {
            const data = {
                name : request.body.name,
                email : request.body.email,
                password: request.body.password,
                phone: request.body.mobile_number,
                image :  request.file ? request.file.originalname : null,
                role : request.body.role,
            }
            const  accessToken = jwt.sign({userId: data,}, tokenSecretKey);
            await userModel.create(data);

            sendresponse = response.status(200).json({
                success: true,
                message: "Registeration  successfully",
                data: data,
                accessToken : accessToken,
            });
        }catch (e){

            sendresponse = response.status(500).json({
                success: false,
                message: "Registeration failed :" + e.message,
                data: null,
            });
        }

        return  sendresponse;

    },

    adminLogin:async (request, response) =>{
        let sendResponse;
        try{
            const user = await userModel.findOne({ email: request.body.email });

            if(user.role === "admin"){
                const data = {
                    name : user.name,
                    email : user.email,
                    password: user.password,
                    phone: user.phone,
                    image :  user.image,
                    role : user.role,
                    isBlocked:user.isBlocked
                }
                const  accessToken = jwt.sign({user: data,}, tokenSecretKey);
                sendResponse = response.status(200).json({
                    success: true,
                    message: "Login Successfully",
                    data: user,
                    accessToken : accessToken
                });
            }else{
                sendResponse = response.status(500).json({
                    success: false,
                    message: "Invail Login Credentials ",
                    data: null,
                });

            }
        }catch (e){
            sendResponse = response.status(500).json({
                success: true,
                message: "Error : " +e.message ,
                data: null,
            });
        }
        return sendResponse;
    },

    doLogin:async (request, response) =>{
        let sendResponse;
        try{
            const user = await userModel.findOne({ email: request.body.email });

            if(user.role === "users"){
                const data = {
                    id: user._id,
                    name : user.name,
                    email : user.email,
                    password: user.password,
                    phone: user.phone,
                    image :  user.image,
                    role : user.role,
                    isBlocked:user.isBlocked
                }
                const  accessToken = jwt.sign({user: data,}, tokenSecretKey);
                sendResponse = response.status(200).json({
                    success: true,
                    message: "Login Successfully",
                    data: user,
                    accessToken : accessToken
                });
            }else{
                sendResponse = response.status(500).json({
                    success: false,
                    message: "Invail Login Credentials ",
                    data: null,
                });

            }
        }catch (e){
            sendResponse = response.status(500).json({
                success: true,
                message: "Error : " +e.message ,
                data: null,
            });
        }
        return sendResponse;
    },

    getUserList:async (request,response) => {
        let sendResponse;
        let data =[];
        const page = request.query.page;
        const limit = request.query.limit;
        const startIndex = (page -1) * limit;
        const endIndex = page *limit;
        try{
           const verify  = verifyToken.verifyToken(request.headers['authorization']);
           if(verify.data === null){
               sendResponse = response.status(403).json({  success: false, message: "Invalid request", data: null, });
           }else{
               if(request.params.keyword !== undefined){
                   console.log(request.params.keyword);
                   userModel.find({$or: [{name: request.params.keyword}, {email: request.params.keyword}]},{}, function (error, user) {
                       if (!error) {
                           if (user.length === 0) {
                               sendResponse = response.status(200).json({
                                   success: false,
                                   message: "No match found",
                                   data: null,
                               });
                           } else {
                               user.forEach(function (item) {
                                   const usersList = {
                                       "id": item._id,
                                       "name": item.name,
                                       "email": item.email,
                                       "image": item.image,
                                       "phone": item.phone,
                                       "isBlocked": item.isBlocked,
                                   }
                                   data.push(usersList);
                               });
                               sendResponse = response.status(200).json({
                                   success: true,
                                   message: "UserList",
                                   data: data.slice(startIndex, endIndex),
                                   totalPageCount: data.length
                               });

                           }
                       }
                       else {
                           sendResponse = response.status(500).json({
                               success: false,
                               message: "something went wrong",
                               data: null,
                           });
                       }
                   });
               }
               else{
                   userModel.find({},function (error,users){
                       if(!error ){
                           if(users.length === 0){
                               sendResponse = response.status(200).json({
                                   success: true,
                                   message: "Users empty",
                                   data: null
                               });
                           }else{
                               users.forEach(function (item){
                                   if(item.role !== "admin"){
                                       const usersList = {
                                           "id"  : item._id,
                                           "name": item.name,
                                           "email": item.email,
                                           "image": item.image,
                                           "phone": item.phone,
                                           "isBlocked" : item.isBlocked,
                                       }
                                       data.push(usersList);
                                   }

                               });
                               sendResponse = response.status(200).json({
                                   success: true,
                                   message: "UsersList",
                                   data: data.slice(startIndex,endIndex),
                                   totalPageCount:data.length
                               });
                           }
                       }else{
                           sendResponse = response.status(200).json({
                               success: true,
                               message: "something went wrong",
                               data: data
                           });
                       }
                   });
               }

           }
        }catch (e) {
            sendResponse = response.status(500).json({
                success: true,
                message: "Error : " +e.message ,
                data: null,
            });
        }
        return sendResponse;
    },

    changeStatus: async (request, response) => {
        let sendResponse;
        try {
            const verify  = verifyToken.verifyToken(request.headers['authorization']);
            if(verify.data === null){
                sendResponse = response.status(403).json({  success: false, message: "Invalid request", data: null, });
            }else {
                console.log(request.body);
                const data = {
                    isBlocked: request.body.isBlocked
                }
                await userModel.findByIdAndUpdate(request.body.id, data);
                sendResponse =  response.status(200).json({
                    success: true,
                    message: "Successfully update status",
                    data: null,
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

    getUser:async (request,response) => {
        let sendResponse;
        let  user =[];
        let  getAddress=[];
        try{
            const verify  = verifyToken.verifyToken(request.headers['authorization']);
            if(verify.data === null){
                sendResponse = response.status(403).json({  success: false, message: "Invalid request", data: null, });
            }else {
                addressModel.find({userId:request.body.id},function (error,address){
                    if(!error ){
                        if(address.length === 0){
                            getAddress=[];
                        }else{
                            console.log(address);
                            address.forEach(function (item){
                               const setaddress = {
                                   "id" : item._id,
                                   "userId" : item.userId,
                                   "fullAddress"  : item.fullAddress,
                                   "houseFlatNo": item.houseFlatNo,
                                       "landMark": item.landMark,
                                   "latitude": item.latitude,
                                   "longitude": item.longitude,
                                   "type" : item.type,
                               }
                               getAddress.push(setaddress)
                               console.log(getAddress);
                            });
                        }
                    }else{
                        getAddress=[];
                    }
                });
                const  getUser = await userModel.findById({_id:request.body.id});
                if(getUser){
                    user = {
                        "id"  : getUser._id,
                        "name": getUser.name,
                        "email": getUser.email,
                        "image": getUser.image,
                        "phone": getUser.phone,
                        "isBlocked" : getUser.isBlocked,
                    }
                }
                sendResponse = response.status(200).json({
                    success: true,
                    message: "success",
                    user: user,
                    address:getAddress,
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