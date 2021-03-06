import PostRespository from "./respository"
import BaseServices from '../../core/Service';
import response from "../../../Util/Response";
import UserClass from "../../../Models/Class/User_Class"
import Post from "../../../Models/Class/Post"
import validator from "validator";
import fs from "fs"
import {
    uploads
} from "../../../Config/cloundinary"
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
    async create(req) {
        try {
            console.log(req.body);
            const data = req.body
            if (!(Number(data.Class_Id) === data.Class_Id)) {
                if (validator.isNumeric(data.Class_Id)) {
                    data.Class_Id = Number(data.Class_Id)
                } else {
                    throw 'Class ID must be numberic'
                }
            }
            if (req.userData.Role == 'Teacher') {
                const checkUser = await UserClass.query().where({
                    User_Id: req.userData.ID,
                    Class_Id: data.Class_Id
                })
                if (checkUser.length == 0) {
                    throw 'error.MustBeTeachingInClassToAccess'
                }
            }
            data.User_Id = req.userData.ID
            await this.respository.create(data)
            return response(201, 'Success !!!')

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
                class: true,
                users: true
            }, column)
            data.forEach(element => {
                element.WriterName = element.users.Name
                element.users = undefined
                element.ClassName = element.class.Name
                element.class = undefined
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
    async getListOffSetClass(req, column) {
        try {
            if (req.userData.Role == 'Student') {
                const checkUser = await UserClass.query().where({
                    User_Id: req.userData.ID,
                    Class_Id: req.params.classID
                })
                if (!checkUser) {
                    throw 'error.MustBeJoinedToAccess'
                }
            }
            const classID = req.params.classID
            const page = req.params.page
            const limit = req.params.limit
            const count = await this.respository.tableQuery().joinRelated('[class, users]').where('class.ID', classID)
            const offset = (page - 1) * limit
            if (offset > count) {
                throw 'Offset can not be greater than the number of data'
            }
            const data = await this.respository.listOffSet(offset, limit, column).withGraphJoined('[class, users]').where('class.ID', classID)
            if (data.length > 0) {
                data.forEach(element => {
                    element.users.Password = undefined
                    element.ClassName = element.class.Name
                    element.class = undefined
                });
            }
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
    async search(query, page, limit, searchBy = [], column = ['*']) {
        try {
            for (let i = 0; i < searchBy.length; i++) {
                const count = await this.respository.count().where(searchBy[i], 'like', `%${query}%`)
                const offset = (page - 1) * limit
                const data = await this.respository.graphFetched(offset, limit, '[class, users]', column).where(searchBy[i], 'like', `%${query}%`)
                if (data.length != 0) {
                    data.forEach(async element => {
                        element.WriterName = element.users.Name
                        element.users = undefined
                        element.ClassName = element.class.Name
                        element.class = undefined
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
    async getInforById(req) {
        try {
            if (req.userData.Role == 'Student') {
                const checkUser = await UserClass.query().where({
                    User_Id: req.userData.ID,
                    Class_Id: req.params.classID
                })
                if (!checkUser) {
                    throw 'error.MustBeJoinedToAccess'
                }
            }
            const id = req.params.id
            const data = await this.respository
                .findAt(id, ['ID', 'Title', 'Content','imageURL', 'created_at', 'updated_at']).withGraphFetched('[users,class]')
            if (data) {
                data.users.Password = undefined
                data.ClassName = data.class.Name
                data.class = undefined
            }
            return response(200, 'Success !!!', data);
        } catch (error) {
            return response(400, error.toString())
        }
    }

    async deleteById(id) {
        try {
            const post = await Post.query().findById(id)
            const result = await post.$query().deleteById(id)
            return response(200, 'Success !!!',result);
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async uploadImage(req) {
        try {
            const file = req.file
            const image = await uploads(file.path, 'Post');
            const Avatar = image.url
            // await this.respository.updateById({
            //     Avatar
            // }, id)
            await fs.unlinkSync(file.path)
            return response(200, 'Success !!!', Avatar)
        } catch (error) {
            return response(400, error.toString())
        }
    }
}