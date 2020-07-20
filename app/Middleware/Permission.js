import RoleRespository from "../API/modules/roles/respository"


export default async (req, res, next) => {
    const roleName = req.userData.Role;
    console.log('Role name ---->', roleName);
    const roleFetched = await RoleRespository.Instance().listBy(['*'],{Name: roleName}).withGraphFetched('permissions.module')
    console.log(roleFetched[0].permissions[0]);
    next()
}