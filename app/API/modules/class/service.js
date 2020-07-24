import ClassRespository from "./respository"
import SubjectRespository from "../subject/respository"
import UserClass from "../../../Models/Class/User_Class"
import BaseServices from '../../core/Service';
import getSlug from "slugify"
import response from "../../../Util/Response"
import validator from "validator"

export default class ClassService extends BaseServices {
    static _Instance;
    static Instance() {
        if (!this._Instance) {
            this._Instance = new this();
        }
        return this._Instance;
    }
    getModule() {
        return ClassRespository.Instance();
    }

    async create(req) {
        try {
            if (!(Number(req.body.StudentAmount) === req.body.StudentAmount)) {
                if (validator.isNumeric(req.body.TeacherID)) {
                    req.body.TeacherID = Number(req.body.TeacherID)
                } else {
                    throw 'TeacherID must be numberic'
                }
            }
            const subject = await SubjectRespository.Instance().getBy({
                Name: req.body.Subject
            })
            const Slug = getSlug(req.body.Name + ' ' + Date.now(), {
                replacement: '.',
                lower: true
            })

            const query = {
                Name: req.body.Name,
                Detail: req.body.Detail,
                Subject_Id: subject.ID,
                StudentAmount: req.body.StudentAmount,
                Slug
            }
            const dataFetched = await this.respository.create(query)
            await UserClass.query().insert({
                User_Id: req.body.TeacherID,
                Class_Id: dataFetched.ID
            })
            return response(200, 'Success !!!')
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async getList(req, table, column) {
        try {
            const page = req.params.page
            const limit = req.params.limit
            const count = await this.respository.tableQuery().joinRelated(table).where('subject.Name', req.params.subject).count('subject.ID as CNT');
            const offset = (page - 1) * limit
            if (offset > count) {
                throw 'Offset can not be greater than the number of data'
            }
            const data = await this.respository.listOffSet(offset, limit, column).joinRelated(table).where('subject.Name', req.params.subject)
            return {
                status: 200,
                message: 'Success !!!',
                totalRow: count[0].CNT,
                data
            }
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async searchWithSubject(query, page, limit, subject, column) {
        try {
            const count = await this.respository.tableQuery().joinRelated('subject')
                .where('subject.Name', subject)
                .where('Class.Name', 'like', `%${query}%`).count('subject.ID as CNT');
            const offset = (page - 1) * limit
            const data = await this.respository.listOffSet(offset, limit, column).joinRelated('subject')
                .where('subject.Name', subject).where('Class.Name', 'like', `%${query}%`)
            if (data.length != 0) {
                return {
                    status: 200,
                    message: 'Success !!!',
                    totalRow: count[0].CNT,
                    data
                }
            }
            return {
                status: 200,
                message: 'Success !!!',
                totalRow: 0,
            }
        } catch (error) {
            return response(400, error.toString())
        }
    }
}