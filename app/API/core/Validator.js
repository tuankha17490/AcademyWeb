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
            if (!validator.isLength(req.body.Password, {
                    min: 6
                }) || !validator.isAlphanumeric(req.body.Password)) {
                return res.status(200).json({
                    status: 400,
                    error: 'Paswword is invalid',
                    message: 'Password is greater than 6 character and only number,alphabet'
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
            if (!validator.isBoolean(req.body.Gender)) {
                return res.status(200).json({
                    status: 400,
                    error: 'Gender is invalid'
                })
            }
            return true
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
                // if (!validator.isURL(req.file)) {
                return res.status(200).json({
                    status: 400,
                    error: 'Avatar is invalid'
                })

                // }
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