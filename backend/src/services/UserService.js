const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./JwtService")

const createUser = (newUser) => {
    return new Promise( async (resolve, reject) => {
        const {email,password} = newUser
        try {
            const checkUser = await User.findOne({
                email:email
            })
            if(checkUser !== null){
                resolve({
                    status: 'ERR',
                    message: 'The email is already'
                })
            }
            
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                email,
                password: hash,
            })
            if(createdUser){
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
            
        } catch(e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise( async (resolve, reject) => {
        const { email,password} = userLogin
        try {
            const checkUser = await User.findOne({
                email:email
            })
            if(checkUser === null){
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if(!comparePassword){
                resolve({
                    status: 'ERR',
                    message: 'The password or user is incorrect',
                })
            }
            const access_token = await generalAccessToken({
                id:checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await generalRefreshToken({
                id:checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })
            
        } catch(e) {
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findById(id);
            if (!checkUser) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined',
                });
                return;
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser,
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findById(id);
            if (!checkUser) {
                resolve({
                    status: 'ERR',
                    message: 'The user does not exist',
                });
                return;
            }

            await User.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'DELETE SUCCESS',
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {            
            const allUser = await User.find();
            resolve({
                status: 'OK',
                message: 'GET USER SUCCESS',
                data: allUser
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(id);
            if (!user) {
                resolve({
                    status: 'ERR',
                    message: 'The user does not exist',
                });
                return;
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message,
            });
        }
    });
};


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
}