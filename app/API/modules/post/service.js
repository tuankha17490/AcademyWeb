import PostRespository from "./respository"
import BaseServices from '../../core/Service';
import response from "../../../Util/Response";
import UserClass from "../../../Models/Class/User_Class"
import validator from "validator";
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
            const data = req.body
            if (!(Number(data.Class_Id) === data.Class_Id)) {
                if (validator.isNumeric(data.Class_Id)) {
                    data.Class_Id = Number(data.Class_Id)
                } else {
                    throw 'Class ID must be numberic'
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
            const id = req.params.id
            const data = await this.respository
                .findAt(id, ['ID', 'Title', 'Content', 'created_at', 'updated_at']).withGraphFetched('[users,class]')
            console.log('asdadsadad', data);
            if(req.userData.Role == 'Student' && data) {
                const checkUser = await UserClass.query().where({User_Id: req.userData.ID, Class_Id: data.class.ID})
                if(!checkUser) {
                    throw 'error.MustBeJoinedToAccess'
                }
            }
            if (data) {
                data.WriterName = data.users.Name
                data.users = undefined
                data.ClassName = data.class.Name
                data.class = undefined
            }
            return response(200, 'Success !!!', data);
        } catch (error) {
            return response(400, error.toString())
        }
    }
}