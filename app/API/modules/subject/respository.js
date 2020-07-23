import BaseRespository from '../../core/Repository'
import Subject from "../../../Models/Class/Subject"
export default class SubjectRespository extends BaseRespository {
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
        return Subject;
    }
   
    
}