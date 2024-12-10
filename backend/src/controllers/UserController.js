const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        // Email validation regex
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);

        // Check if input fields are provided
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'All fields are required'
            });
        }

        // Validate email format
        if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Invalid email format'
            });
        }

        // Validate password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Password and confirm password do not match'
            });
        }

        // Call the UserService to create the user
        const response = await UserService.createUser(req.body);

        // Return response from UserService
        return res.status(201).json(response); // Status 201 for successful resource creation
    } catch (e) {
        // Log and return error message
        console.error(e);
        return res.status(500).json({
            status: 'ERR',
            message: 'Internal server error',
            error: e.message || e
        });
    }
};

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if(!email || !password){
            return res.status(200).json({
                status:'ERR',
                message: 'The input is required'
            })
        }else if(!isCheckEmail){
            return res.status(200).json({
                status:'ERR',
                message: 'The input must be email'
            })  
        }
        const response = await UserService.loginUser(req.body)
        const {refresh_token, ... newReponse}=response
        //console.log('response',response)
        res.cookie('refresh_token', refresh_token,{
            httpOnly:true,
            secure:false,
            samesite:'strict'
        })
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req,res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userid is required'
            })
        }
        const response = await UserService.updateUser(userId,data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req,res) => {
    try {
        const userId = req.params.id
        //const token = req.headers
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userid is required'
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req,res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsUser = async (req,res) => {
    try {
        const userId = req.params.id
        //const token = req.headers
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userid is required'
            })
        }
        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async (req,res) => {
    //console.log('req.cookies',req.cookies)
    try {
        const token = req.cookies.refresh_token
        //const token = req.headers
        if(!token){
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshTokenJWTService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const logoutUser = async (req,res) => {
    //console.log('req.cookies',req.cookies)
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status:'OK',
            message:'Logout suscessfully'
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser
}