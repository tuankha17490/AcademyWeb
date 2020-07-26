import ClassRespository from "./respository"
import SubjectRespository from "../subject/respository"
import UserClass from "../../../Models/Class/User_Class"
import BaseServices from '../../core/Service';
import getSlug from "slugify"
import Class from "../../../Models/Class/Class"
import {
    raw
} from "objection"
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
                CurrenceAmount: 0,
                PostAmount: 0,
                Slug
            }
            const dataFetched = await this.respository.create(query)
            await UserClass.query().insert({
                User_Id: req.body.TeacherID,
                Class_Id: dataFetched.ID
            })
            return response(201, 'Success !!!')
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async getList(req, table, column) {
        try {
            const page = req.params.page
            const limit = req.params.limit
            const count = await this.respository.tableQuery().joinRelated(table).where('subject.Name', req.params.subject).count('Class.ID as CNT');
            const offset = (page - 1) * limit
            if (offset > count) {
                throw 'Offset can not be greater than the number of data'
            }
            const data = await this.respository.listOffSet(offset, limit, column)
            .withGraphJoined('[subject, users.roles]').where('subject.Name', req.params.subject).where('users:roles.Name', 'Teacher')
            if (data) {
                data.forEach(element => {
                    element.TeacherName = element.users[0].Name
                    element.users = undefined
                });
            }
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
            const data = await this.respository.listOffSet(offset, limit, column).withGraphJoined('[subject, users.roles]')
                .where('subject.Name', subject).where('users:roles.Name', 'Teacher').where('Class.Name', 'like', `%${query}%`)
            if (data.length != 0) {
                data.forEach(element => {
                    element.TeacherName = element.users[0].Name
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
                data: []
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
            if (data) {
                data.forEach(element => {
                    // element.Subject = element.subject.Name
                    element.TeacherName = element.users[0].Name
                    element.users = undefined
                    // element.subject = undefined
                });
            }
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
                        element.TeacherName = element.users[0].Name
                        element.users = undefined
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
                data: []
            }
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async joinClass(req) {
        try {
            if (!(Number(req.body.classID) === req.body.classID)) {
                if (validator.isNumeric(req.body.classID)) {
                    req.body.classID = Number(req.body.classID)
                } else {
                    throw 'classID must be numberic'
                }
            }
            if (!(Number(req.body.studentID) === req.body.studentID)) {
                if (validator.isNumeric(req.body.studentID)) {
                    req.body.studentID = Number(req.body.studentID)
                } else {
                    throw 'studentID must be numberic'
                }
            }
            const Class = await this.respository.findAt(req.body.classID)
            if (Class.StudentAmount <= Class.CurrenceAmount) {
                throw 'error.ClassIsFull'
            }
            const checkUserClass = await UserClass.query().where({
                Class_Id: req.body.classID,
                User_Id: req.body.studentID
            })
            if (checkUserClass.length > 0) {
                throw 'error.AlreadyInClass'
            }
            await UserClass.query().insert({
                Class_Id: req.body.classID,
                User_Id: req.body.studentID
            })
            await this.respository.updateById({
                CurrenceAmount: Class.CurrenceAmount + 1
            }, req.body.classID)
            return response(200, 'Success !!!')
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async removeStudent(req) {
        try {
            const {
                classID
            } = req.params
            const {
                studentID
            } = req.params
            await UserClass.query().where({
                Class_Id: classID,
                User_Id: studentID
            }).delete()
            await Class.query().where({
                ID: classID
            }).patch({
                CurrenceAmount: raw('CurrenceAmount - 1')
            })
            return response(200, 'Success !!!')
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async updateById(req, id) {
        try {
            const data = req.body
            const joinQuery = await this.respository.findAt(id, ['Class.*'])
                .withGraphJoined('users.roles').where('users:roles.Name', 'Teacher')
            if (joinQuery.CurrenceAmount > data.StudentAmount) {
                throw 'error.MaxStudentMustBeGreaterThanCurrence'
            }
            if (data.TeacherID != undefined) {
                if (!(Number(data.TeacherID) === data.TeacherID)) {
                    if (validator.isNumeric(data.TeacherID)) {
                        data.TeacherID = Number(data.TeacherID)
                    } else {
                        throw 'TeacherID must be numberic'
                    }
                }
                await UserClass.query().where({
                    Class_Id: id,
                    User_Id: joinQuery.users[0].ID
                }).patch({
                    User_Id: data.TeacherID
                })
                data.TeacherID = undefined
            }
            await this.respository.updateById(data, id)
            return response(201, 'Success !!!')
        } catch (error) {
            return response(400, error.toString())
        }
    }

    async getInforById(id, table) {
        try {
            const data = await this.respository
                .findAt(id, ['Class.*']).withGraphJoined(table)
            if (data) {
                data.users = {}
                data.users.ID = data.subject.users[0].ID
                data.users.Name = data.subject.users[0].Name
                data.subject.users = undefined
            }
            return response(200, 'Success !!!', data);
        } catch (error) {
            return response(400, error.toString())
        }
    }


}