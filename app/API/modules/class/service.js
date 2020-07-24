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
            if (!(Number(req.body.TeacherID) === req.body.TeacherID)) {
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
            const count = await this.respository.tableQuery().withGraphJoined(table).where('subject.Name', req.params.subject).count('subject.ID as CNT');
            const offset = (page - 1) * limit
            if (offset > count) {
                throw 'Offset can not be greater than the number of data'
            }
            const data = await this.respository.listOffSet(offset, limit, column).withGraphJoined('[subject, users]').where('subject.Name', req.params.subject)
            data.forEach(element => {
                element.Subject = element.subject.Name
                element.TeacherName = element.users[0].Name
                element.subject = undefined
                element.users = undefined
            });
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
            const data = await this.respository.listOffSet(offset, limit, column).withGraphJoined('[subject, users]')
                .where('subject.Name', subject).where('Class.Name', 'like', `%${query}%`)
            
            if (data.length != 0) {
                data.forEach(element => {
                    element.Subject = element.subject.Name
                    element.TeacherName = element.users[0].Name
                    element.subject = undefined
                    element.users = undefined
                });
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
    async getListOffSet(page, limit, column = ['*']) {
        try {
            const count = await this.respository.count();
            const offset = (page - 1) * limit
            if (offset > count) {
                throw 'Offset can not be greater than the number of data'
            }
            const data = await this.respository.graphFetched(offset, limit, {
                subject: true,
                users: true
            }, column)
            data.forEach(element => {
                element.Subject = element.subject.Name
                element.TeacherName = element.users[0].Name
                element.users = undefined
                element.subject = undefined
            });
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
    async search(query, page, limit, searchBy = [], column = ['*']) {
        try {
            for (let i = 0; i < searchBy.length; i++) {
                const count = await this.respository.count().where(searchBy[i], 'like', `%${query}%`)
                const offset = (page - 1) * limit
                const data = await this.respository.graphFetched(offset, limit, '[subject, users]', column).where(searchBy[i], 'like', `%${query}%`)
                if (data.length != 0) {
                    data.forEach(async element => {
                        element.Subject = element.subject.Name
                        element.TeacherName = element.users[0].Name
                        element.users = undefined
                        element.subject = undefined
                    });
                    return {
                        status: 200,
                        message: 'Success !!!',
                        totalRow: count[0].CNT,
                        data
                    }
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
    async joinClass(req) {
        try {
            let count = await this.respository.relatedJoin('user_class').where('user_class.Class_Id',req.body.classID).count('Class.ID as CNT');
            count = count[0].CNT -1
            if(req.body.StudentAmount <= count) {
                throw 'error.ClassIsFull'
            }
            await UserClass.query().insert({Class_Id: req.body.classID, User_Id: req.body.studentID})
            return response(200, 'Success !!!')
        } catch (error) {
            return response(400, error.toString())
        }
    }
}