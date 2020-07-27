import BaseController from '../../core/Controller'
import PostService from "./service"
export default class PostController extends BaseController {
    constructor() {
        super();
    }
    getModule() {
        return PostService.Instance();  
    }
    getListOffSet(page, limit) {
        return this.service.getListOffSet(page, limit,['ID', 'Title', 'Content','imageURL', 'created_at', 'updated_at'])
    }
    search(data,page, limit) {
        return this.service.search(data,page, limit, ['Title'],['ID', 'Title', 'Content','imageURL', 'created_at', 'updated_at'])
    }
    getListOffSetClass(req) {
        return this.service.getListOffSetClass(req,['Post.ID', 'Post.Title', 'Post.Content','Post.imageURL', 'Post.created_at', 'Post.updated_at'])
    }
    uploadImage(req) {
        return this.service.uploadImage(req)
    }
}