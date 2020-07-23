import BaseController from '../../core/Controller'
import ClassService from "./service"
export default class ClassController extends BaseController {
    constructor() {
        super();
    }
    getModule() {
        return ClassService.Instance();  
    }
    search(data,page, limit) {
        return this.service.search(data,page, limit,'subject', ['Name'],['ID', 'Name', 'Detail', 'StudentAmount', 'Slug'])
    }
    getListOffSet(page, limit) {
        return this.service.getListOffSet(page, limit,'subject',['ID', 'Name', 'Detail', 'StudentAmount', 'Slug'])
    }
    getInforById(id) {
        return this.service.getInforById(id, 'subject');
    }
    getList(req) {
        return this.service.getList(req, 'subject', ['Class.ID', 'Class.Name', 'Class.Detail', 'Class.StudentAmount', 'Class.Slug'])
    }
}