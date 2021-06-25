const userModel = require('../model/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSecretKey = '!!@$%anGularAdmin@$%!!';

module.exports = {
    register: async (req, res) => {
        try {
            const dataToSave = {
                email: req.body.email,
                password: req.body.password,
                phone: req.body.mobile_number,
                name: req.body.name,
                role : req.body.role,
            };
            const user = await userModel.create(dataToSave);

            const data = {
                'id': user._id,
                'email': user.email,
                'mobile_number': user.phone,
                'status': user.status,
                'role': user.role,
            }

            return res.status(200).json({
                success: true,
                message: "",
                data : data,
            });
        } catch(e) {
            return res.status(500).json({
                success: false,
                message: e.message,
                data: null
            });
        }
    },
    doLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            let sendResponse;
            const user = await userModel.findOne({ email: req.body.email });
            console.log(user._id);
            if(user){
                const  accessToken = jwt.sign({userId: user._id,}, tokenSecretKey);
                sendResponse = res.status(200).json({
                    success: true,
                    message: "Login Successfully",
                    data: user,
                    accessToken : accessToken
                });
            }else{
                sendResponse = res.status(200).json({
                    success: false,
                    message: "Invalid Email or Password",
                    data: null,
                    accessToken : null
                });
            }
            return sendResponse;
        } catch (e) {
            return   res.status(500).json({
                success: false,
                message: e.message,
                data: null
            });
        }
    },

    getUser:async (req,res) =>{
        try{
            const token = req.headers['authorization'];
            if(token){
                const token = req.headers['authorization'].split(' ')[1];
                const tokenData = jwt.verify(token, tokenSecretKey);
                const user = await userModel.findOne({ _id: tokenData.userId });
                return  res.status(500).json({
                   success: true,
                   message: "User profile",
                   data: user
               });
           }else{
               return  res.status(500).json({
                   success: false,
                   message: "Invalid valid request.token not exist  ",
                   data: null
               });
           }


        }catch (e) {
            return  res.status(500).json({
                success: false,
                message: e.message,
                data: null
            });
        }
    }

}
