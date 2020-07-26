import BaseRespository from '../../core/Repository'
import Post from "../../../Models/Class/Post"
export default class PostRespository extends BaseRespository {
    static _Instance;
    static Instance() {
        if (!this._Instance) {
            this._Instance = new this();
        }
        return this._Instance;
    }
    constructor() {
        super()
    }
    getTable() {
        return Post;
    }
    
}