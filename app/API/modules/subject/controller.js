import BaseController from '../../core/Controller'
import SubjectService from "./service"
export default class SubjectController extends BaseController {
    constructor() {
        super();
    }
    getModule() {
        return SubjectService.Instance();  
    }
   
}