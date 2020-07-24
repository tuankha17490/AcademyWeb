import response from "../../Util/Response"
export default class BaseServices {
    constructor() {
        this.respository = this.getModule();
    }
    async getList() {
        try {
            const data = await this.respository.listBy();
            return data;
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async getListOffSet(page, limit,table, column = ['*']) {
        try {
            const count = await this.respository.count();
            const offset = (page - 1) * limit
            if (offset > count) {
                throw 'Offset can not be greater than the number of data'
            }
            const data = await this.respository.graphFetched(offset, limit, table, column)
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
    async search(query, page, limit,table, searchBy = [], column = ['*']) {
        try {
            for (let i = 0; i < searchBy.length; i++) {
                const count = await this.respository.count().where(searchBy[i], 'like', `%${query}%`)
               
                const offset = (page - 1) * limit
                const data = await this.respository.graphFetched(offset, limit, table, column).where(searchBy[i], 'like', `%${query}%`)
                if (data.length != 0) {
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
    async create(param) {
        try {
            const dataFetch = await this.respository.create(param);
            return dataFetch;
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async getInforById(id,table) {
        try {
            const data = await this.respository.findAt(id).withGraphFetched(table)
            return response(200, 'Success !!!', data);
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async getInformation(condition) {
        try {
            const data = await this.respository.getBy(condition);
            return response(200, 'Success !!!', data);
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async updateById(data, id) {
        try {
            const result = await this.respository.updateById(data, id)
            return response(200, 'Success !!!', result);
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async deleteById(id) {
        try {
            await this.respository.deleteById(id);
            return response(200, 'Success !!!');
        } catch (error) {
            return response(400, error.toString())
        }
    }
}