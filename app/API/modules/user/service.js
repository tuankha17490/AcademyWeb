import UserRespository from "./respository"
import BaseServices from '../../core/Service';
import RoleRespository from "../roles/respository"
import SubjectRespository from "../subject/respository"
import UserClass from "../../../Models/Class/User_Class"
import getSlug from "slugify"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import process from "process"
import fs from "fs"
import response from "../../../Util/Response"
import {
    uploads
} from "../../../Config/cloundinary"
dotenv.config({
    silent: process.env.NODE_ENV === 'production'
});
export default class UserService extends BaseServices {
    static _Instance;
    static Instance() {
        if (!this._Instance) {
            this._Instance = new this();
        }
        return this._Instance;
    }
    getModule() {
        return UserRespository.Instance();
    }

    async register(param) {
        try {
            const checkEmail = await this.respository.getBy({
                Email: param.Email
            })
            if (checkEmail) {
                throw 'error.EmailAlreadyRegister'

            }
            const Slug = getSlug(param.Name + ' ' + Date.now(), {
                replacement: '.',
                lower: true
            })
            param.Slug = Slug
            param.Password = bcrypt.hashSync(param.Password, 10)
            const checkRole = await RoleRespository.Instance().getBy({
                Name: 'Student'
            })
            if (!checkRole) {
                const createRole = await RoleRespository.Instance().create({
                    Name: 'Student'
                })
                param.Role_Id = createRole.ID
            } else {
                param.Role_Id = checkRole.ID
            }

            await this.respository.create(param);
            return response(201, 'Success !!!')
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async create(req) {
        try {
            const param = req.body
            if (req.userData.Role == 'Moderator' && req.body.Role != undefined) {
                return response(403, 'error.isNotPermittedToAccess')
            }
            if (req.userData.Role == 'Moderator') {
                param.Role = 'Student'
            }
            if (req.userData.Role == 'Admin') {
                if (param.Role == undefined || param.Role == '') {
                    return response(400, 'error.RoleUndefined')
                }
                if (param.Role == 'Admin') {
                    return response(403, 'error.isNotPermittedToAccess')
                }

            }
            if (param.Role == 'Teacher') {
                if (param.Subject == undefined) {
                    throw 'error.NeedSubjectOfTeacher'
                }
                const subject = await SubjectRespository.Instance().getBy({
                    Name: param.Subject
                })
                param.Subject_Id = subject.ID
            }
            param.Subject = undefined
            const checkRole = await RoleRespository.Instance().getBy({
                Name: param.Role
            })
            if (!checkRole) {
                const createRole = await RoleRespository.Instance().create({
                    Name: param.Role
                })
                param.Role_Id = createRole.ID
                param.Role = undefined
            } else {
                param.Role_Id = checkRole.ID
                param.Role = undefined
            }

            const checkEmail = await this.respository.getBy({
                Email: param.Email
            })
            if (checkEmail) {
                throw 'error.EmailAlreadyRegister'

            }
            if(param.Gender == "true") param.Gender = true
            else param.Gender = false
            const Slug = getSlug(param.Name + ' ' + Date.now(), {
                replacement: '.',
                lower: true
            })
            param.Slug = Slug
            param.Password = bcrypt.hashSync(param.Password, 10)

            await this.respository.create(param);
            return response(201, 'Success !!!')
        } catch (error) {
            return response(400, error.toString())
        }
    }

    async login(param) {
        try {
            const queryData = await this.respository.getBy({
                Email: param.Email
            }).withGraphFetched('roles')
            if (queryData) {
                const checkPassWordHashed = bcrypt.compareSync(param.Password, queryData.Password)
                if (checkPassWordHashed) {
                    const token = await jwt.sign({
                        ID: queryData.ID,
                        Email: queryData.Email,
                        Role: queryData.roles.Name
                    }, process.env.JWT_KEY, {
                        expiresIn: "2h"
                    })
                    return {
                        status: 200,
                        message: 'Login Success',
                        token,
                        data: {
                            Email: queryData.Email,
                            Slug: queryData.Slug,
                            Name: queryData.Name,
                            Role: queryData.roles.Name
                        }
                    }
                } else {
                    throw 'error.PasswordIsWrong'
                }
            } else {
                throw 'error.AccountIsNotRegistered'
            }
        } catch (error) {
            return response(400, error.toString())
        }
    }

    async updateInformation(req) {
        try {
            const data = req.body
            if (data.Password != undefined) {
                data.Password = bcrypt.hashSync(data.Password, 10)
            }
            const id = req.userData.ID
            const checkEmail = await this.respository.getBy({
                Email: data.Email
            })
            if (checkEmail && id != checkEmail.ID) {
                throw 'error.EmailAlreadyRegister'
            }
            const dataFetch = await this.respository.updateAndFetchById(data, id)
            const result = {
                Name: dataFetch.Name,
                Email: dataFetch.Email,
                ID: dataFetch.ID,
                Slug: dataFetch.Slug,
                Gender: dataFetch.Gender,
                Role: req.userData.Role
            }
            return response(200, 'Success !!!', result)
        } catch (error) {
            return response(400, error.toString())
        }
    }

    async updateUserById(req, id) {
        try {
            const data = req.body
            if (data.Password != undefined) {
                data.Password = bcrypt.hashSync(data.Password, 10)
            }
            const checkEmail = await this.respository.getBy({
                Email: data.Email
            })
            if (checkEmail && id != checkEmail.ID) {
                throw 'error.EmailAlreadyRegister'
            }
            if (data.Role == 'Admin') {
                throw 'error.DontAllowUpgradeAdmin'
            }
            const checkRole = await RoleRespository.Instance().getBy({
                Name: data.Role
            })
            data.Role_Id = checkRole.ID
            const result = {}
            result.Role = data.Role
            data.Role = undefined

            const dataFetch = await this.respository.updateAndFetchById(data, id)
            result.ID = dataFetch.ID
            result.Name = dataFetch.Name
            result.Email = dataFetch.Email
            result.Slug = dataFetch.Slug
            result.Gender = dataFetch.Gender
            return response(200, 'Success !!!', result)
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async uploadAvatar(req) {
        try {
            const file = req.file
            const id = req.userData.ID
            const image = await uploads(file.path, req.userData.Name);
            const Avatar = image.url
            await this.respository.updateById({
                Avatar
            }, id)
            await fs.unlinkSync(file.path)
            return response(200, 'Avatar of user uploaded successfully', Avatar)
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async passwordConfirm(req) {
        try {
            const password = req.body.Password
            const id = req.userData.ID
            const data = await this.respository.findAt(id)
            const status = bcrypt.compareSync(password, data.Password)
            if (status) {
                return response(200, 'Password correct. Confirm password successful !!!')
            } else {
                throw 'error.IncorrectPassword'
            }
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async getMe(decode) {
        try {
            const data = await this.respository
                .findAt(decode.ID, ['ID', 'Name', 'Email', 'Avatar', 'Gender', 'Slug'])
                .withGraphFetched('[roles, class.subject]')
            data.class.forEach(element => {
                element.Subject_Id = undefined
                element.created_at = undefined
                element.updated_at = undefined
                element.Subject = element.subject.Name
                element.subject = undefined
            });
            return response(200, 'Success !!!', data)
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async deleteById(req) {
        try {
            const id = req.params.id
            if (id == req.userData.ID) {
                return response(403, 'error.cantDeleteYourself');
            }
            const temp = await this.respository.findAt(id).withGraphFetched('subject')
            console.log(temp);
            if(temp.Role_Id == 3) {
                const checkTeacher = await UserClass.query().where({User_Id: temp.ID})
                if(checkTeacher.length > 0) {
                    throw 'error.AlreadyHasClass'
                }
                await SubjectRespository.Instance().updateById({TeacherAmount: temp.subject.TeacherAmount - 1},temp.Subject_Id)
            }
            const result = await this.respository.deleteById(id);
            return response(200, 'Success !!!', result);
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async getTeacher(req, column) {
        try {
            const result = await this.respository.relatedJoin('[roles, subject]').select(column)
                .where('roles.Name', 'Teacher').where('subject.Name', req.params.subject).withGraphFetched('[roles,subject]')
            return response(200, 'Success !!!', result);
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async getListOffSetStudent(classID, page, limit, column) {
        try {
            const count = await this.respository.tableQuery().joinRelated('[class, roles]').where('class.ID', classID)
            .where('roles.Name', 'Student')
            const offset = (page - 1) * limit
            if (offset > count) {
                throw 'Offset can not be greater than the number of data'
            }
            const data = await this.respository.listOffSet(offset, limit, column).joinRelated('[class, roles]').where('class.ID', classID)
            .where('roles.Name', 'Student')
            return {
                status: 200,
                message: 'Success !!!',
                totalRow: count.length,
                data
            }
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async searchStudent(classID, page, limit, query, column) {
        try {
            const count = await this.respository.tableQuery().joinRelated('[class, roles]').where('class.ID', classID)
            .where('Users.Name', 'like', `%${query}%`).orWhere('Users.Email', 'like', `%${query}%`).where('roles.Name', 'Student')
            console.log(count);
            const offset = (page - 1) * limit
            if (offset > count) {
                throw 'Offset can not be greater than the number of data'
            }
            const data = await this.respository.listOffSet(offset, limit, column).joinRelated('[class, roles]').where('class.ID', classID)
            .where('Users.Name', 'like', `%${query}%`).orWhere('Users.Email', 'like', `%${query}%`).where('roles.Name', 'Student')
            return {
                status: 200,
                message: 'Success !!!',
                totalRow: count.length,
                data
            }
        } catch (error) {
            return response(400, error.toString())
        }
    }
}