import SubjectRespository from "./respository"
import BaseServices from '../../core/Service';
export default class SubjectService extends BaseServices {
    static _Instance;
    static Instance() {
        if (!this._Instance) {
            this._Instance = new this();
        }
        return this._Instance;
    }
    getModule() {
        return SubjectRespository.Instance();
    }
    
}