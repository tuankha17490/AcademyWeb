export default class BaseServices {
    constructor() {
        this.respository = this.getModule();
    }
    async getList() {
        try {
            const data = await this.respository.listBy();
            return data;
        } catch (error) {
            return error.toString()
        }
    }
    async getListOffSet(page, limit,table, column = ['*']) {
        try {
            const count = await this.respository.count();
            const offset = (page - 1) * limit
            if (offset > count) {
                return {
                    status: 400,
                    message: 'Offset can not be greater than the number of data'
                }
            }
            const data = await this.respository.graphFetched(offset, limit, table, column)
            return {
                status: 200,
                message: 'Success !!!',
                data
            }
        } catch (error) {
            return {
                status: 400,
                message: 'Get list failed',
                error: error.toString()
            }
        }
    }
    async create(param) {
        try {
            const dataFetch = await this.respository.create(param);
            return dataFetch;
        } catch (error) {
            return error
        }
    }
    async getInforById(id) {
        try {
            const data = await this.respository.findAt(id);
            return data;
        } catch (error) {
            return error
        }
    }
    async getInformation(condition) {
        try {
            const data = await this.respository.getBy(condition);
            return data;
        } catch (error) {
            return error
        }
    }
    async updateById(data, id) {
        try {
            const result = await this.respository.updateById(data, id)
            return result
        } catch (error) {
            return error;
        }
    }
    async deleteById(id) {
        try {
            const result = await this.respository.deleteById(id);
            return result;
        } catch (error) {
            return error
        }
    }
}