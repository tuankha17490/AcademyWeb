import express from "express"
const router = express.Router();
import UserController from "./controller"
import authorization from "../../../Middleware/Authorization"
import UserValidator from "./validator"
import multer from "../../../Config/multer"
import UserPermission from "../../../Middleware/Permission"
const controller = new UserController()
const validator = new UserValidator()
const permission = new UserPermission('Users')
router.get('/',authorization,(req, res) => {
    try {
        controller.getList().then(result => {return res.json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_USER_LIST');
        return res.status(200).json(error)
    }
})

router.post('/create',authorization,permission.Create,validator.registerTask,async (req, res) => {
    try {
        controller.create(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_CREATE_USER')
        return res.status(200).json(error)
    }
})
router.get('/me',authorization,(req, res) => {
    try {
        controller.getMe(req.userData).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_MY_USER');
        return res.status(200).json(error)
    }
})
router.get('/teacher/:subject', (req, res) => {
    try {
        controller.getTeacher(req).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_MY_USER');
        return res.status(200).json(error)
    }
})

router.get('/:page&:limit',authorization,permission.GetList, (req, res) => {
    try {
        controller.getListOffSet(req.params.page,req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_USER_LIST_PAGINATION');
        return res.status(200).json(error)
    }
})

router.get('/search/:page&:limit',authorization,permission.Search, (req, res) => {
    try {
        controller.search(req.query.data,req.params.page,req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_SEARCH_USER');
        return res.status(200).json(error)
    }
})


router.get('/:id',authorization,permission.Read, (req, res) => {
    try {
        controller.getInforById(req.params.id).then(result =>{return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_INFORMATION_OF_USER')
        return res.status(200).json(error)
    }
})

router.post('/check-password', authorization, (req, res) => {
    try {
        controller.passwordConfirm(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        return res.status(200).json(error)
    }
})

router.put('/upload-avatar',authorization,permission.UpdateMyUser,multer.single('avatar'),validator.uploadImage, (req, res) => {
    try {
        controller.uploadAvatar(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_UPLOAD_AVATAR')
        return res.status(200).json(error)
    }
})

router.put('/update-information',authorization,permission.UpdateMyUser,validator.updateTask, (req, res) => {
    try {
        controller.updateInformation(req).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_UPDATE_USER')
        return res.status(200).json(error)
    }
   
})


router.put('/:id',authorization,permission.Update,validator.updateTask, (req, res) => {
    try {
        controller.updateUserById(req, req.params.id).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_UPDATE_USER')
        return res.status(200).json(error)
    }
   
})


router.delete('/:id',authorization,permission.Delete, (req, res) => {
    try {
        controller.deleteById(req).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_DELETE_USER')
        return res.status(200).json(error)
    }
})



export default router;
