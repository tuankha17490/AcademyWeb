import BaseValidator from "../../core/Validator"
export default class UserValidator extends BaseValidator {
    constructor() {
        super()
    }
    createTask(req, res, next) {
        try {
            const checkAmount = super.studentAmountValidate(req, res)
            if (checkAmount != true) return checkAmount
            const checkName = super.nameValidate(req, res)
            if(checkName != true) return checkName
            next()
        } catch (error) {
            return res.status(200).json({
                status: 400,
                error: error.toString()
            })
        }
    }
}