import BaseValidator from "../../core/Validator"
export default class PostValidator extends BaseValidator {
    constructor() {
        super()
    }
    createTask(req, res, next) {
        try { 
            const checkTitle = super.titleValidate(req, res)
            if(checkTitle != true) return checkTitle;
            const checkContent = super.contentValidate(req, res)
            if(checkContent != true) return checkContent;
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
            const checkTitle = super.titleValidate(req, res)
            if(checkTitle != true) return checkTitle;
            const checkContent = super.contentValidate(req, res)
            if(checkContent != true) return checkContent;
            next()
        } catch (error) {
            return res.status(200).json({
                status: 400,
                error: error.toString()
            })
        }
    }
}