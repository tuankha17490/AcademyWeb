import express from "express"
const router = express.Router();
import ClassController from "./controller"
import authorization from "../../../Middleware/Authorization"
import ClassValidator from "./validator"
import ClassPermission from "../../../Middleware/Permission"
const validator = new ClassValidator()
const permission = new ClassPermission('Class')
const controller = new ClassController()


router.post('/create',authorization,permission.Create, validator.createTask,(req, res) => {
    try {
        controller.create(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_CREATE_CLASS')
        return res.status(200).json(error)
    }
})

router.post('/add-student',authorization, permission.JoinClass, (req, res) => {
    try {
        controller.joinClass(req).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_JOIN_CLASS')
        return res.status(200).json(error)
    }
})

router.get('/:page&:limit', authorization,permission.GetList,(req, res) => {
    try {
        controller.getListOffSet(req.params.page, req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_CLASS_LIST_PAGINATION');
        return res.status(200).json(error)
    }
})

router.get('/search/:page&:limit',authorization,permission.Search, (req, res) => {
    try {
        controller.search(req.query.data,req.params.page,req.params.limit).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_SEARCH_CLASS');
        return res.status(200).json(error)
    }
})


router.get('/search/:subject/:page&:limit', (req, res) => {
    try {
        controller.searchWithSubject(req.query.data,req.params.page,req.params.limit, req.params.subject).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_SEARCH_CLASS');
        return res.status(200).json(error)
    }
})

router.get('/:subject/:page&:limit', (req, res) => {
    try {
        controller.getList(req).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_CLASS_LIST_PAGINATION');
        return res.status(200).json(error)
    }
})


router.get('/:id',authorization,permission.Read, (req, res) => {
    try {
        controller.getInforById(req.params.id).then(result =>{return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_GET_INFORMATION_OF_CLASS')
        return res.status(200).json(error)
    }
})


router.put('/:id',validator.updateTask, (req, res) => {
    try {
        controller.updateById(req, req.params.id).then(result => {return res.status(201).json(result)})
    } catch (error) {
        console.log('CONTROLLER_UPDATE_CLASS')
        return res.status(200).json(error)
    }
   
})


router.delete('/:id',authorization,permission.Delete, (req, res) => {
    try {
        controller.deleteById(req.params.id).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_DELETE_CLASS')
        return res.status(200).json(error)
    }
})

router.delete('/remove-student/:classID&:studentID', (req, res) => {
    try {
        controller.removeStudent(req).then(result => {return res.status(200).json(result)})
    } catch (error) {
        console.log('CONTROLLER_DELETE_CLASS')
        return res.status(200).json(error)
    }
})
export default router