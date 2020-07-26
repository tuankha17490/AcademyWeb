import PostRespository from "./respository"
import BaseServices from '../../core/Service';
import response from "../../../Util/Response";
import UserClass from "../../../Models/Class/User_Class"
import validator from "validator";
export default class PostService extends BaseServices {
    static _Instance;
    static Instance() {
        if (!this._Instance) {
            this._Instance = new this();
        }
        return this._Instance;
    }
    getModule() {
        return PostRespository.Instance();
    }
    
}