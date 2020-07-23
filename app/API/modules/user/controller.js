import BaseController from '../../core/Controller'
import UserService from "./service"
export default class UserController extends BaseController {
    constructor() {
        super();
    }
    getModule() {
        return UserService.Instance();  
    }
    login(param) {
        return this.service.login(param);
    }
    updateUserById(data, id) {
        return this.service.updateUserById(data, id);
    }
    uploadAvatar(req) {
        return this.service.uploadAvatar(req)
    }
    passwordConfirm(req) {
        return this.service.passwordConfirm(req)
    }
    getListOffSet(offset, limit) {
        return this.service.getListOffSet(offset, limit,'roles',['ID', 'Name', 'Email', 'Gender', 'Avatar', 'Slug'])
    }
    getMe(decode) {
        return this.service.getMe(decode)
    }
    search(data,page, limit) {
        return this.service.search(data,page, limit,'roles', ['Name', 'Email'],['ID', 'Name', 'Email', 'Gender', 'Avatar', 'Slug'])
    }
    updateInformation(req) {
        return this.service.updateInformation(req)
    }
    register(req) {
        return this.service.register(req)
    }
    getInforById(id) {
        return this.service.getInforById(id, 'roles');
    }
}