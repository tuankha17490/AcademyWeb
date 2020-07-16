import BaseValidator from "../../core/Validator"
export default class UserValidator extends BaseValidator {
    constructor() {
        super()
    }
    registerTask(req, res, next) {
        try { 
            const checkEmail = super.emailValidate(req, res)
            if(checkEmail != true) return checkEmail;
            const checkFullname = super.nameValidate(req, res)
            if(checkFullname != true) return checkFullname;
            const checkPassword = super.passwordValidate(req, res)
            if(checkPassword != true) return checkPassword;
            const checkGender = super.genderValidate(req, res)
            if(checkGender != true) return checkGender
            next()
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error: error.toString()
            })
        }
    }
    updateTask(req, res, next) {
        try {
            if(req.body.Email == undefined) {
                return {
                    status: 400,
                    message: 'Invalid Email'
                }
            }
            if(req.body.Name == undefined) {
                return {
                    status: 400,
                    message: 'Invalid Name'
                }
            }
            if(req.body.Password == undefined) {
                return {
                    status: 400,
                    message: 'Invalid Password'
                }
            }
            if(req.body.Gender == undefined) {
                return {
                    status: 400,
                    message: 'Invalid Gender'
                }
            }
            const checkEmail = super.emailValidate(req, res)
            if(checkEmail != true) return checkEmail;
            const checkName = super.nameValidate(req, res)
            if(checkName != true) return checkName;
            const checkPassword = super.passwordValidate(req, res)
            if(checkPassword != true) return checkPassword;
            const checkGender = super.genderValidate(req, res)
            if(checkGender != true) return checkGender
            next()
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error: error.toString(),
            })
        }
    }
    uploadImage(req, res, next) {
        try {
            const checkAvatar = super.avatarValidate(req, res)
            if(checkAvatar != true) return checkAvatar;
            next()
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error: error.toString()
            })
        }
    }
}