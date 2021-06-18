const userModel = require('../model/user.model')
const bcrypt = require('bcrypt');

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
            const user = await userModel.findOne({ email: req.body.email });
            if(!user || !(await bcrypt.compare(req.body.password, user.password))) {
                return res.status(200).json({
                    success: false,
                    message: "Invalid Email or Password",
                    data: null
                });
            }

            const data = {
                'id': user._id,
                'email': user.email,
                'mobile_number': user.phone,
                'status': user.status,
                'role': user.role,
            }

            return res.status(200).json({
                success: true,
                message: "Login Successfully",
                data: data
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message,
                data: null
            });
        }
    },
}
