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
            return res.status(200).json({
                status: 400,
                error: error.toString()
            })
        }
    }
    updateTask(req, res, next) {
        try {
            const checkEmail = super.emailValidate(req, res)
            if(checkEmail != true) return checkEmail;
            const checkName = super.nameValidate(req, res)
            if(checkName != true) return checkName;
            if(req.body.Password != undefined) {
                const checkPassword = super.passwordValidate(req, res)
                if(checkPassword != true) return checkPassword;
            }
            const checkGender = super.genderValidate(req, res)
            if(checkGender != true) return checkGender
            next()
        } catch (error) {
            return res.status(200).json({
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
            return res.status(200).json({
                status: 400,
                error: error.toString()
            })
        }
    }
}