import RoleRespository from "../API/modules/roles/respository"
var module
export default class Permissions {
    constructor(moduleName) {
        module = moduleName
    }
    async Read(req,res,next) {
        console.log(module);
        const roleName = req.userData.Role;
        const roleFetched = await RoleRespository.Instance().listBy(['*'],{Name: roleName})
        .withGraphFetched('permissions.[modules, methods]')
       const data = roleFetched[0].permissions
        for(let i = 0; i < data.length; i++) {
            if(data[i].modules[0].Name == module && data[i].methods[0].Name == 'Read') {
                console.log(data[i].modules[0].Name);
                break
            }
            if(i == data.length -1) {
                return res.status(200).json({
                    status:403,
                    message: 'error.NotPermisssionToAccess'
                })
            }
        }
        next()
    }
    async Create(req,res,next) {
        console.log(module);
        const roleName = req.userData.Role;
        const roleFetched = await RoleRespository.Instance().listBy(['*'],{Name: roleName})
        .withGraphFetched('permissions.[modules, methods]')
       const data = roleFetched[0].permissions
        for(let i = 0; i < data.length; i++) {
            if(data[i].modules[0].Name == module && data[i].methods[0].Name == 'Create') {
                console.log(data[i].modules[0].Name);
                break
            }
            if(i == data.length -1) {
                return res.status(200).json({
                    status:403,
                    message: 'error.NotPermisssionToAccess'
                })
            }
        }
        next()
    }
    async Update(req,res,next) {
        console.log(module);
        const roleName = req.userData.Role;
        const roleFetched = await RoleRespository.Instance().listBy(['*'],{Name: roleName})
        .withGraphFetched('permissions.[modules, methods]')
       const data = roleFetched[0].permissions
        for(let i = 0; i < data.length; i++) {
            if(data[i].modules[0].Name == module && data[i].methods[0].Name == 'Update') {
                console.log(data[i].modules[0].Name);
                break
            }
            if(i == data.length -1) {
                return res.status(200).json({
                    status:403,
                    message: 'error.NotPermisssionToAccess'
                })
            }
        }
        next()
    }
    async Delete(req,res,next) {
        console.log(module);
        const roleName = req.userData.Role;
        const roleFetched = await RoleRespository.Instance().listBy(['*'],{Name: roleName})
        .withGraphFetched('permissions.[modules, methods]')
       const data = roleFetched[0].permissions
        for(let i = 0; i < data.length; i++) {
            if(data[i].modules[0].Name == module && data[i].methods[0].Name == 'Delete') {
                console.log(data[i].modules[0].Name);
                break
            }
            if(i == data.length -1) {
                return res.status(200).json({
                    status:403,
                    message: 'error.NotPermisssionToAccess'
                })
            }
        }
        next()
    }
    async Search(req,res,next) {
        console.log(module);
        const roleName = req.userData.Role;
        const roleFetched = await RoleRespository.Instance().listBy(['*'],{Name: roleName})
        .withGraphFetched('permissions.[modules, methods]')
       const data = roleFetched[0].permissions
        for(let i = 0; i < data.length; i++) {
            if(data[i].modules[0].Name == module && data[i].methods[0].Name == 'Search') {
                console.log(data[i].modules[0].Name);
                break
            }
            if(i == data.length -1) {
                return res.status(200).json({
                    status:403,
                    message: 'error.NotPermisssionToAccess'
                })
            }
        }
        next()
    }
}