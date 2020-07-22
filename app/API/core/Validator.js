import validator from "validator"
export default class BaseValidator {
    emailValidate(req, res) {
        try {
            if (!validator.isEmail(req.body.Email)) {
                return res.status(200).json({
                    status: 400,
                    error: 'Email is invalid'
                })
            }
            return true
        } catch (error) {
            return res.status(200).json({
                status: 400,
                message: 'Email error',
                error: error.toString()
            })
        }
    }
    nameValidate(req, res) {
        try {
            if (!validator.isLength(req.body.Name, {
                    min: 1,
                    max: 255
                })) {
                return res.status(200).json({
                    status: 400,
                    error: 'Name is invalid',
                    message: 'Name is too long or null'
                })
            }
            return true
        } catch (error) {
            return res.status(200).json({
                status: 400,
                message: 'Name error',
                error: error.toString()
            })
        }
    }
    passwordValidate(req, res) {
        try {
            console.log(req.body.Password);
            if(!validator.isLength(req.body.Password, {
                min: 6,
            })) {
                return res.status(200).json({
                    status: 400,
                    message: 'error.mustGreaterThan6'
                })
            }
            if (!validator.isAlphanumeric(req.body.Password)) {
                return res.status(200).json({
                    status: 400,
                    message: 'error.onlyAlphaAndNumber'
                })
            }
            return true
        } catch (error) {
            return res.status(200).json({
                status: 400,
                message: 'Password error',
                error: error.toString()
            })
        }
    }
    genderValidate(req, res) {
        try {
            console.log(req.body.Gender != true);
            if (req.body.Gender == true || req.body.Gender == false) {
                return true
               
            }
            return res.status(200).json({
                status: 400,
                error: 'Gender is required boolean'
            })
        } catch (error) {
            return res.status(200).json({
                status: 400,
                message: 'Gender error',
                error: error.toString()
            })
        }
    }
    avatarValidate(req, res) {
        try {
            if (req.file == undefined) {
                return res.status(200).json({
                    status: 400,
                    error: 'Avatar is invalid'
                })
            }
            return true
        } catch (error) {
            return res.status(200).json({
                status: 400,
                message: 'Avatar error',
                error: error.toString()
            })
        }
    }
}