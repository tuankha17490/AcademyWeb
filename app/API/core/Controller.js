export default class BaseConTroller {
    constructor() {
        this.service = this.getModule();
    }
    getList() {
        return this.service.getList();
    }
    getListOffSet(page, limit) {
        return this.service.getList(page, limit)
    }
    create(param) {
        return this.service.create(param);
    }
    getInforById(id) {
        return this.service.getInforById(id);
    }
    getInformation(condition) {
        return this.service.getInformation(condition)
    }
    updateById(data, id) {
        return this.service.updateById(data, id);
    }
    deleteById(id){
        return this.service.deleteById(id);
    }
    search(data) {
        return this.service.search(data)
    }
}