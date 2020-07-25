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
        return this.service.search(data,page, limit, ['Name'],['ID', 'Name', 'Detail', 'StudentAmount', 'CurrenceAmount','PostAmount','Slug'])
    }
    getListOffSet(page, limit) {
        return this.service.getListOffSet(page, limit,['ID', 'Name', 'Detail', 'StudentAmount','CurrenceAmount','PostAmount', 'Slug'])
    }
    getInforById(id) {
        return this.service.getInforById(id, 'subject.users');
    }
    getList(req) {
        return this.service.getList(req, 'subject', ['Class.ID', 'Class.Name', 'Class.Detail', 'Class.StudentAmount','Class.CurrenceAmount','Class.PostAmount', 'Class.Slug'])
    }
    searchWithSubject(data, page, limit, subject) {
        return this.service.searchWithSubject(data, page, limit,subject,['Class.ID', 'Class.Name', 'Class.Detail', 'Class.StudentAmount','Class.CurrenceAmount','Class.PostAmount', 'Class.Slug'])
    }
    joinClass(req) {
        return this.service.joinClass(req);
    }
    removeStudent(req) {
        return this.service.removeStudent(req)
    }
}