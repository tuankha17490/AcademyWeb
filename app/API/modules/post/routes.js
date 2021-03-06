import express from "express"
const router = express.Router();
import PostController from "./controller"
import authorization from "../../../Middleware/Authorization"
import PostValidator from "./validator"
import UserPermission from "../../../Middleware/Permission"
import multer from "../../../Config/multer"
const controller = new PostController()
const validator = new PostValidator()
const permission = new UserPermission()

router.post('/create',authorization,permission.setModulePost,permission.Create,validator.createTask,async (req, res) => {
    try {
        controller.create(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_CREATE_USER')
        return res.status(200).json(error)
    }
})


router.put('/upload-image',authorization,permission.setModuleUsers,permission.UpdateMyUser,multer.single('image'), (req, res) => {
    try {
        controller.uploadImage(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_UPLOAD_AVATAR')
        return res.status(200).json(error)
    }
})

router.get('/:page&:limit',authorization,permission.setModulePost,permission.GetList, (req, res) => {
    try {
        controller.getListOffSet(req.params.page,req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_USER_LIST_PAGINATION');
        return res.status(200).json(error)
    }
})

router.get('/search/:page&:limit',authorization,permission.setModulePost,permission.Search, (req, res) => {
    try {
        controller.search(req.query.data,req.params.page,req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_SEARCH_USER');
        return res.status(200).json(error)
    }
})

router.get('/:classID/:page&:limit',authorization, (req, res) => {
    try {
        controller.getListOffSetClass(req).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_USER_LIST_PAGINATION');
        return res.status(200).json(error)
    }
})



router.get('/:id',authorization, (req, res) => {
    try {
        controller.getInforById(req).then(result =>{return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_INFORMATION_OF_USER')
        return res.status(200).json(error)
    }
})

router.put('/:id',authorization,permission.setModulePost,permission.Update,validator.updateTask, (req, res) => {
    try {
        controller.updateById(req.body, req.params.id).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_UPDATE_CLASS')
        return res.status(200).json(error)
    }
   
})

router.delete('/:id',authorization,permission.setModulePost,permission.Delete, (req, res) => {
    try {
        controller.deleteById(req.params.id).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_DELETE_USER')
        return res.status(200).json(error)
    }
})



export default router