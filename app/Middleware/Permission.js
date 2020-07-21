import RoleRespository from "../API/modules/roles/respository"
var module
const Excute = async (req, res, method) => {
    const roleName = req.userData.Role;
    const roleFetched = await RoleRespository.Instance().listBy(['*'], {
            Name: roleName
        })
        .withGraphFetched('permissions.[modules, methods]')
    const data = roleFetched[0].permissions
    for (let i = 0; i < data.length; i++) {
        if (data[i].modules[0].Name == module && data[i].methods[0].Name == method) {
            break
        }
        if (i == (data.length - 1)) {
            return res.status(200).json({
                status: 403,
                message: 'error.isNotPermittedToAccess'
            })
        }
    }
    return true
}
export default class Permissions {
    constructor(moduleName) {
        module = moduleName
    }

    async GetList(req, res, next) {
        const excute = await Excute(req, res, 'GetList')
        if(excute != true) return excute
        next()
    }

    async Create(req, res, next) {
        const excute = await Excute(req, res, 'Create')
        if(excute != true) return excute
        next()
    }

    async Read(req, res, next) {
        const excute = await Excute(req, res, 'Read')
        if(excute != true) return excute
        next()
    }

    async Delete(req, res, next) {
        const excute = await Excute(req, res, 'Delete')
        if(excute != true) return excute
        next()
    }
    async Update(req, res, next) {
        const excute = await Excute(req, res, 'Update')
        if(excute != true) return excute
        next()
    }
    async Search(req, res, next) {
        const excute = await Excute(req, res, 'Search')
        if(excute != true) return excute
        next()
    }
    async JoinClass(req, res, next) {
        const excute = await Excute(req, res, 'JoinClass')
        if(excute != true) return excute
        next()
    }
    async UpdateMyUser(req, res, next) {
        const excute = await Excute(req, res, 'UpdateMyUser')
        if(excute != true) return excute
        next()
    }
}