import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOtp from "../utils/otpGenerate.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken";

export async function registerUserController(request,response){
    try {
        const { name, email , password } = request.body

        if(!name || !email || !password){
            return response.status(400).json({
                message : "provide email, name, password",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if(user){
            return response.json({
                message : "Already register email",
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)

        const payload = {
            name,
            email,
            password : hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Verify email from binkeyit",
            html : verifyEmailTemplate({
                name,
                url : VerifyEmailUrl
            })
        })

        return response.json({
            message : "User register successfully",
            error : false,
            success : true,
            data : save
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function VerfiyEmailController(request,response){
    try {
        
        const { code }  = request.body

        const user = await UserModel.findOne({
            _id : code
        })

        if(user){
            return response.status(400).jspn({
                message : "Invaild code"
            })
        }

        const updateUser = await UserModel.updateOne({ _id : code },{
            verify_email : true
        })

        return response.json({
            message : "Verification Email Done",
            success : true,
            error : false
        })

    } catch (error) {
        return response.status(500).json({
            message : true,
            error : true,
            scccess : true 
        })
    }
}

// Login Controller
export async function loginController(request, response) {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({
                message: "Provide email and password",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return response.status(401).json({
                message: "User not registered",
                error: true,
                success: false
            });
        }

        if (user.status !== "Active") {
            return response.status(403).json({
                message: "Contact Admin for activation",
                error: true,
                success: false
            });
        }

        const checkPassword = await bcryptjs.compare(password, user.password);

        if (!checkPassword) {
            return response.status(401).json({
                message: "Check your password",
                error: true,
                success: false
            });
        }

        const accessToken = await generatedAccessToken(user._id);
        const refresh_token = await generatedRefreshToken(user._id);
        
        const updateUser = await UserModel.findByIdAndUpdate(user._id, {
            last_login_date : new Date()
        });
        
        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        response.cookie('accessToken', accessToken, cookiesOption);
        response.cookie('refreshToken', refresh_token, cookiesOption);

        return response.json({
            message: "Login Successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refresh_token
            }
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

//Logout Controller
export async function logoutController(request, response) {
    try {
        const userId = request.userId //middleware
        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        response.clearCookie("accessToken", cookiesOption);
        response.clearCookie("refreshToken", cookiesOption);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId,{
            refresh_token : ""
        })

        return response.json({
            message: "Logout Successfully",
            error: false,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

//upload user avatar
export async function uploadAvatar(request,response){
    try {
        const userId = request.userId // auth middleware
        const image = request.file    //multer middleware

        const upload = await uploadImageCloudinary(image)
        
        const updateUser = await UserModel.findByIdAndUpdate(userId,{
            avatar : upload.url
        })


        return response.json({
            message : 'upload profile',
            success : true,
            error : false,
            data : {
                _id : userId,
                avatar : upload.url
            }
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//update user details
export async function updateUserDetails(request,response) {

    try {
        const userId = request.userId // auth middleware
        const {name,email,password,mobile} = request.body

        let hashpassword = ""

        if(password){

        const salt = await bcryptjs.genSalt(10)
        hashpassword = await bcryptjs.hash(password,salt)

        }

        const updateUser = await UserModel.updateOne({ _id : userId},{
            ...(name && {name : name }),
            ...(email && {email : email }),
            ...(mobile && {mobile : mobile }),
            ...(password && {password : hashpassword })  
        })

        return response.json({
            message : "updated user successfully",
            error : false,
            success : true,
            date : updateUser
        })



    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
        
    }
    
}

// //forgot password Origanl Code
// export async function forgotPasswordController(request,response) {
//     try {
        
//         const {email} = request.body

//         const user = await UserModel.findOne({email})
//         if(!user){
//             return response.status(400).json({
//                 message : "Email not available",
//                 error : error,
//                 success : false
//             })
//         }

//         const otp = generateOtp()
//         const expireTime = new Data() + 60 * 60 * 1000 //1hr

//         const update = await UserModel.findByIdAndUpdate(user._id,{
//             forgot_password_otp : otp,
//             forgot_password_expiry : new Data(expireTime).toISOString()
//         })

//         await sendEmail({
//             sendTo : email,
//             subject : "Forgot Password from Binkeyit",
//             html : forgotPasswordTemplate({
//                 name : user.name,
//                 otp : otp,
                
//             })
//         })

//         return response.json({
//             message : "Check your email",
//             error : false,
//             success : true
//         })

//     } catch (error) {
//         return response.status(500).json({
//             message : error || error,
//             error : false,
//             success : false
//         })
//     }
// }


// forgot password code from given in GPT
export async function forgotPasswordController(request, response) {
    try {
        
        const { email } = request.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            });
        }

        const otp = generateOtp();
        const expireTime = new Date().getTime() + 60 * 60 * 1000; // 1hr

        const update = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            forgot_password_expiry: new Date(expireTime).toISOString()
        });

        await sendEmail({
            sendTo: email,
            subject: "Forgot Password from Binkeyit",
            html: forgotPasswordTemplate({
                name: user.name,
                otp: otp,
            })
        });

        return response.json({
            message: "Check your email",
            error: false,
            success: true
        });

    } catch (error) {
        console.error(error); // Log error for debugging
        return response.status(500).json({
            message: error.message || 'Something went wrong', // Access the error message here
            error: true,
            success: false
        });
    }
}

//Verify forgot Password Otp
export async function verfiyForgotPasswordOtp(request,response){
    try {
        const {email , otp } = request.body

        if(!email || !otp ){
            return response.status(400).json({
                message : "Provide required field email, otp.",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            });
        }

        const currentTime = new Date().toISOString()

        if (!user.forgot_password_expiry < currentTime){
            return response.status(400).json({
                message : "Otp is expired",
                error : true,
                success : false
            })
        }

        if(otp !== user.forgot_password_otp){
            return response.status(400).json({
                message : "Invalid Otp",
                error : true,
                success : false
            })
        }

        //if otp is not expired
        //otp === user.forgot_password_otp

        const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
            forgot_password_otp : "",
            forgot_password_expiry : ""
        })

        return response.json({
            message : "Verify otp successfully",
            error : false,
            success : true
        })


        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//Reset the Password
export async function resetpassword(request,response) {
    try {
        
        const {email , newPassword, confirmPassword} = request.body

        if(!email || !newPassword || !confirmPassword){
            return response.status(400).json({
                message : "Provide required fields email , newPassword, Confirm Password"

            })
        }

        const user = await UserModel.findOne({ email })

        if(!user){
            return response.status(400).json({
                message : "Email is not available",
                error : true,
                success : false
            })
        }
        
        if(newPassword !== confirmPassword){
            return response.status(400).json({
                message : "newPassword and Confirm Password is not same",
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(newPassword,salt)

        const update = await UserModel.findByIdAndUpdate(user._id,{
            password : hashpassword
        })

        return response.json({
            message : "Password Updated Successfully",
            error : false,
            success : true,
        })

    } catch (error) {
        return response.status(500).json({
            message : error || error ,
            error : true,
            success : false
        })
    }
    
}

//Refresh Token
export async function refreshTokenController(request,response){
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split(" ")[1]

        if(!refreshToken){
            return response.status(401).json({
                message : "Provide refresh token",
                error : true,
                success : false
            })

        }
        const verfiyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)
        if(!verfiyToken){
            return response.status(401).json({
                message : "Token is expired",
                error : true,
                success : false
            })
        }
        console.log("verify token",verfiyToken)
        const userId = verfiyToken?._id
        const newAccessToken = await generatedAccessToken(verfiyToken.id)

        response.cookie('accessToken',newAccessToken,{
            httpOnly : true,
            secure : true,
            sameSite : "None"
        })

        response.cookie('accessToken',newAccessToken,cookiesOption)
        return response.json({
            message : "New access token generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken
            }
        })
    }
    catch(error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }}

//Get login user details
export async function userDetails(request,response){
    try {
        const userId = request.userId // auth middleware

        const user = await UserModel.findById(userId).select("-password -refresh_token")

        return response.json({
            message : "User details",
            error : false,
            success : true,
            data : user
        })
    } catch (error) {
        return response.status(500).json({
            message : "Something is Wrong",
            error : true,
            success : false
        })
    }
}