import RoleRespository from "../API/modules/roles/respository"
var module
var method
export default class Permissions {
    static _Instance
    static Instance(methodName, moduleName) {
        if (!this._Instance) {
            this._Instance = new this(methodName, moduleName);
        }
        return this._Instance;
    }
    constructor(methodName, moduleName) {
        method = methodName
        module = moduleName
    }

    async Excute(req,res,next) {
        const roleName = req.userData.Role;
        const roleFetched = await RoleRespository.Instance().listBy(['*'],{Name: roleName})
        .withGraphFetched('permissions.[modules, methods]')
       const data = roleFetched[0].permissions
        for(let i = 0; i < data.length; i++) {
            if(data[i].modules[0].Name == module && data[i].methods[0].Name == method) {
                console.log(data[i].modules[0].Name);
                break
            }
            if(i == data.length -1) {
                return res.status(200).json({
                    status:403,
                    message: 'error.isNotPermittedToAccess'
                })
            }
        }
        next()
    }
    
}