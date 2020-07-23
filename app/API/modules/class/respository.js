import BaseRespository from '../../core/Repository'
import Class from "../../../Models/Class/Class"
export default class ClassRespository extends BaseRespository {
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
        return Class;
    }
   
    
}