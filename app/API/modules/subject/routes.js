import express from "express"
const router = express.Router();
import SubjectController from "./controller"
const controller = new SubjectController()


router.get('/', (req, res) => {
    try {
        controller.getList().then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_USER_LIST_PAGINATION');
        return res.status(200).json(error)
    }
})
export default router