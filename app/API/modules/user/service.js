import UserRespository from "./respository"
import BaseServices from '../../core/Service';
import RoleRespository from "../roles/respository"
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

    async create(param) {
        try {
            param.Gender = JSON.parse(param.Gender)
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
                Name: 'Client'
            })
            if (!checkRole) {
                const createRole = await RoleRespository.Instance().create({
                    Name: 'Client'
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
                        Email: queryData.Email
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

    async updateUserById(req, id) {
        try {
            const data = req.body
            const checkEmail = await this.respository.getBy({
                Email: data.Email
            })
            if (checkEmail && id != checkEmail.ID) {
                throw 'error.EmailAlreadyRegister'
            }
            data.Password = bcrypt.hashSync(data.Password, 10)
            const dataFetch = await this.respository.updateAndFetchById(data, id)
            const result = {
                Name: dataFetch.Name,
                Email: dataFetch.Email,
                ID: dataFetch.ID,
                Slug: dataFetch.Slug,
                Gender: dataFetch.Gender
            }
            return response(200, 'User uploaded successfully', result)
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async uploadAvatar(req) {
        try {
            const file = req.file
            const id = req.userData.ID
            const image = await uploads(file.path, 'Images');
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
                .withGraphFetched('roles')
            return response(200, 'Success !!!', data)
        } catch (error) {
            return response(400, error.toString())
        }
    }
}